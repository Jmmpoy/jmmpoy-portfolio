const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const sites = [
  {
    name: 'Agathe Marimbert',
    url: 'https://www.marimbert.fr',
    outputDir: '/Users/jean-marc/Documents/GitHub/Portfolio-V2/public/assets/Projects/AgatheMarimbert',
    files: ['website-hero.png', 'website-portfolio.png']
  },
  {
    name: 'Antonin Saurat',
    url: 'https://www.antoninsaurat.work',
    outputDir: '/Users/jean-marc/Documents/GitHub/Portfolio-V2/public/assets/Projects/AntoninSaurat',
    files: ['website-hero.png', 'website-portfolio.png']
  }
];

async function generateScreenshots() {
  const browser = await puppeteer.launch();

  for (const site of sites) {
    // Crée le répertoire s'il n'existe pas
    if (!fs.existsSync(site.outputDir)) {
      fs.mkdirSync(site.outputDir, { recursive: true });
    }

    const page = await browser.newPage();
    page.setViewport({ width: 1200, height: 1600 });

    try {
      console.log(`Capturant ${site.name}...`);
      await page.goto(site.url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Premier screenshot (hero)
      await page.screenshot({
        path: path.join(site.outputDir, site.files[0]),
        fullPage: false,
        type: 'png'
      });
      console.log(`✓ ${site.files[0]} sauvegardé`);

      // Scroll et deuxième screenshot
      await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.5));
      await new Promise(resolve => setTimeout(resolve, 800));

      await page.screenshot({
        path: path.join(site.outputDir, site.files[1]),
        fullPage: false,
        type: 'png'
      });
      console.log(`✓ ${site.files[1]} sauvegardé`);

    } catch (error) {
      console.error(`Erreur pour ${site.name}:`, error.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n✓ Captures d\'écran générées avec succès!');
}

generateScreenshots().catch(console.error);
