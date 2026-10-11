import { useEffect, useRef, useState } from "react";
import data from "../api";

const ABOUT =
  "Développeur et designer depuis plus de cinq ans, je travaille à la rencontre du design et de la technologie. J’ai collaboré avec des agences, des éditeurs de logiciels, des studios et des start-ups, avec une approche à la fois esthétique et pragmatique.";

const CONTACTS = [
  { text: "Mail", href: "mailto:jmmpoy@gmail.com" },
  { text: "Instagram", href: "https://www.instagram.com/jm.mpy_/?hl=fr" },
  { text: "LinkedIn", href: "https://www.linkedin.com/in/jean-marc-mpoy/" },
];

// Fond par projet. pos : cadrage desktop, pm/zm : cadrage portrait (voir .home-layer dans main.css),
// shade : voile noir pour garder le texte blanc lisible ; dark : fond clair, le texte reste noir (sans voile).
type Bg = { src: string; pos: string; shade: number; pm?: string; zm?: number; video?: string; dark?: boolean };
const BG: Record<string, Bg> = {
  LeCann: { src: "lecann-loupe.webp", pos: "50% 100%", pm: "50% 100%", zm: 1.7, shade: 0.12 },
  AgatheMarimbert: { src: "agathe-omasake-couloir.webp", pos: "50% 60%", shade: 0.22 },
  AntoninSaurat: { src: "antonin-cave-poster.webp", video: "antonin-cave.mp4", pos: "40% 40%", shade: 0.08 },
  Beaumonde: { src: "beaumonde-cose-poster.webp", video: "beaumonde-cose.mp4", pos: "55% 50%", shade: 0, dark: true },
  LeaZeroil: { src: "lea.webp", pos: "50% 74%", shade: 0.05 },
  Maison90: { src: "maison90-role-poster.webp", video: "maison90-role.mp4", pos: "50% 20%", shade: 0.08 },
  myCanal: { src: "mycanal-the-wire.webp", pos: "50% 50%", shade: 0.58 },
};
const dir = "/assets/home/";

const projects = data.filter((p) => BG[p.id]);
const label = "text-[11px] font-neueRegular leading-none uppercase tracking-[0.04em]";
const small =
  "font-neueRegular font-normal text-[clamp(12.5px,.97vw,15px)] leading-[1.15] tracking-[.01em] [word-spacing:.04em] normal-case";

export default function HomeIndex() {
  const [active, setActive] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<string[]>([]);
  const z = useRef(1);
  const zIndex = useRef<Record<string, number>>({});
  const videos = useRef<Record<string, HTMLVideoElement | null>>({});
  const touch = useRef(false);

  // Précharge les fonds un par un quand le navigateur est au repos ; un survol force le chargement immédiat.
  useEffect(() => {
    touch.current = window.matchMedia("(hover: none)").matches;
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const next = () => {
      if (i >= projects.length) return;
      const id = projects[i++].id;
      setLoaded((l) => (l.includes(id) ? l : [...l, id]));
      t = setTimeout(next, 600);
    };
    t = setTimeout(next, 1200);
    return () => clearTimeout(t);
  }, []);

  // Le header passe en blanc sur un fond photo (voir body.home-bg dans main.css).
  useEffect(() => {
    document.body.classList.toggle("home-bg", !!active && !BG[active].dark);
    return () => document.body.classList.remove("home-bg");
  }, [active]);

  const show = (id: string | null) => {
    if (id === active) return;
    if (id) {
      zIndex.current[id] = ++z.current; // le calque entrant passe au-dessus du sortant
      setLoaded((l) => (l.includes(id) ? l : [...l, id]));
    }
    Object.entries(videos.current).forEach(([vid, v]) => {
      if (!v) return;
      if (vid !== id) return v.pause();
      if (!v.src) {
        v.src = dir + BG[vid].video;
        // Chrome peut interrompre un premier play() pendant le chargement : on relance quand la vidéo est prête.
        v.addEventListener("canplay", () => v.paused && v.play().catch(() => {}), { once: true });
      }
      v.play().catch(() => {});
    });
    setActive(id);
  };

  // Tactile : un premier tap prévisualise, le second suit le lien.
  const onClick = (e: React.MouseEvent, id: string) => {
    if (touch.current && active !== id) {
      e.preventDefault();
      show(id);
    }
  };

  const dim = (on: boolean) => (active && !on ? "opacity-50" : "opacity-100");

  return (
    <div
      className={`bg-[#F6F6F3] ${active && !BG[active].dark ? "text-white" : "text-fullBlack"} transition-colors duration-200 ease-out`}
    >
      {/* Fond média : calques par projet + voile */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-0 pointer-events-none bg-black transition-opacity duration-200 ease-out motion-reduce:transition-none ${active ? "opacity-100" : "opacity-0"}`}
      >
        {projects.map((p) => {
          const b = BG[p.id];
          const on = active === p.id;
          return (
            <div
              key={p.id}
              className={`home-layer absolute inset-0 ${on ? "opacity-100 transition-opacity duration-200 ease-out" : "opacity-0 transition-opacity duration-0 delay-200"}`}
              style={
                {
                  zIndex: zIndex.current[p.id],
                  "--pos": b.pos,
                  "--pos-m": b.pm ?? b.pos,
                  "--zoom-m": b.zm ?? 1,
                } as React.CSSProperties
              }
            >
              {b.video ? (
                <video
                  ref={(el) => {
                    videos.current[p.id] = el;
                  }}
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster={loaded.includes(p.id) ? dir + b.src : undefined}
                />
              ) : (
                loaded.includes(p.id) && <img src={dir + b.src} alt="" decoding="async" />
              )}
            </div>
          );
        })}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-200 ease-out"
          style={{ zIndex: 2147483000, opacity: active ? BG[active].shade : 0 }}
        />
      </div>

      <main className="relative z-[1] min-h-svh flex flex-col items-center justify-center gap-[clamp(24px,5.5vh,56px)] px-4 pt-16 pb-[88px] text-center">
        <ul
          aria-label="Projets"
          className="font-neueBold font-bold text-[clamp(24px,2.05vw,34px)] leading-[1.1] tracking-[-0.04em] [word-spacing:.06em]"
          onMouseLeave={() => show(null)}
          onBlur={() => show(null)}
        >
          {projects.map((p, i) => (
            <li
              key={p.id}
              className="home-in text-[length:inherit] leading-[inherit]"
              style={{ "--i": i } as React.CSSProperties}
            >
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => !touch.current && show(p.id)}
                onFocus={() => show(p.id)}
                onClick={(e) => onClick(e, p.id)}
                className={`relative inline-block font-neueBold transition-opacity duration-200 ease-out motion-reduce:transition-none ${dim(active === p.id)}`}
              >
                {p.name}
                {p.inProgress && (
                  <span className={`${label} absolute left-full top-1/2 -translate-y-1/2 ml-[.7em] whitespace-nowrap`}>
                    En cours
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <section
          className={`home-in max-w-[30rem] transition-opacity duration-200 ease-out ${active ? "opacity-70" : ""}`}
          style={{ "--i": projects.length } as React.CSSProperties}
        >
          <h2 className={`${label} mb-2.5`}>À propos</h2>
          <p className={small}>{ABOUT}</p>
        </section>

        <section
          className={`home-in transition-opacity duration-200 ease-out ${active ? "opacity-70" : ""}`}
          style={{ "--i": projects.length + 1 } as React.CSSProperties}
        >
          <h2 className={`${label} mb-2.5`}>Contact</h2>
          <div className={`${small} [@media(hover:hover)]:[&:hover>a:not(:hover)]:opacity-45`}>
            {CONTACTS.map((c) => (
              <a
                key={c.href}
                href={c.href}
                className="block font-neueRegular transition-opacity duration-150 ease-out"
              >
                {c.text}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
