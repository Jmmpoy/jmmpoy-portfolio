import puppeteer from 'puppeteer';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

interface CaptureConfig {
  url: string;
  duration: number;
  fps?: number;
  width?: number;
  height?: number;
  scrollSpeed?: number;
}

async function capturePageVideo(config: CaptureConfig): Promise<string> {
  const {
    url,
    duration,
    fps = 60,
    width = 3840,
    height = 2160,
    scrollSpeed = 5,
  } = config;

  const tmpDir = path.join('/tmp', `video-${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  console.log(`🎬 Launching browser for ${url}...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });

  // Disable animation throttling for smooth GSAP capture
  await page.evaluateOnNewDocument(() => {
    const origRAF = window.requestAnimationFrame;
    let lastTime = Date.now();
    window.requestAnimationFrame = (cb) => {
      return setTimeout(() => {
        lastTime += 1000 / 60; // Force 60fps
        cb(lastTime);
      }, 1000 / 60);
    };
  });

  console.log('📄 Loading page...');
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  // Wait for GSAP + fonts
  await page
    .waitForFunction(
      () =>
        typeof window !== 'undefined' &&
        !!(window as any).gsap &&
        document.readyState === 'complete' &&
        document.fonts.status === 'loaded',
      { timeout: 15000 }
    )
    .catch(() => {
      console.warn('⚠️ GSAP/fonts timeout, continuing anyway...');
    });

  // Wait preloader to finish (1.6s from code)
  console.log('⏳ Waiting preloader animation...');
  await page.waitForTimeout(1800);

  // Capture frames
  const totalFrames = duration * fps;
  console.log(`📸 Capturing ${totalFrames} frames at ${fps}fps (${duration}s)...`);

  for (let i = 0; i < totalFrames; i++) {
    await page.screenshot({
      path: path.join(tmpDir, `frame-${String(i).padStart(6, '0')}.png`),
      quality: 95,
    });

    // Smooth scroll
    await page.evaluate((speed) => {
      window.scrollBy(0, speed);
    }, scrollSpeed);

    if ((i + 1) % 60 === 0) {
      process.stdout.write(`\r  ✓ ${i + 1}/${totalFrames} frames`);
    }
  }
  console.log();

  await browser.close();

  // Encode video - save to Downloads
  const outputDir = path.join(process.env.HOME || '/tmp', 'Downloads', 'portfolio-videos');
  fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(
    outputDir,
    `video-${Date.now()}.mp4`
  );

  console.log('🎥 Encoding video with FFmpeg...');
  console.log(`   Input: ${totalFrames} PNG frames at ${fps}fps`);
  console.log(`   Output: ${width}x${height} @ H.264`);

  execSync(
    `ffmpeg -y -framerate ${fps} \
      -i ${path.join(tmpDir, 'frame-%06d.png')} \
      -c:v libx264 \
      -preset slow \
      -crf 18 \
      -pix_fmt yuv420p \
      -s ${width}x${height} \
      "${outputPath}"`,
    { stdio: 'inherit' }
  );

  // Cleanup
  fs.rmSync(tmpDir, { recursive: true });

  console.log(`\n✅ Video saved: ${outputPath}`);
  return outputPath;
}

async function main() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Segment 1: Preloader + Hero fade-in
  console.log('\n═══════════════════════════════════════════════');
  console.log('📹 VIDEO 1: Preloader + Hero Fade-In (5s)');
  console.log('═══════════════════════════════════════════════\n');
  await capturePageVideo({
    url: baseUrl,
    duration: 5,
    scrollSpeed: 0, // No scroll
  });

  // Segment 2: Scroll animations
  console.log('\n═══════════════════════════════════════════════');
  console.log('📹 VIDEO 2: Scroll with SplitText Animations (40s)');
  console.log('═══════════════════════════════════════════════\n');
  await capturePageVideo({
    url: baseUrl,
    duration: 40,
    scrollSpeed: 3, // Slow scroll for animation timing
  });

  // Segment 3: Interactions
  console.log('\n═══════════════════════════════════════════════');
  console.log('📹 VIDEO 3: Interactions + Projects (45s)');
  console.log('═══════════════════════════════════════════════\n');
  await capturePageVideo({
    url: baseUrl,
    duration: 45,
    scrollSpeed: 4,
  });

  console.log('\n✨ All videos captured! Check /public/videos/');
}

main().catch(console.error);
