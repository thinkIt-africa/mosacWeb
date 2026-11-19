import type { MediaAsset } from "@/types/content";
import { archiveMedia } from "./archive-media";

/**
 * Image register. Selections, alt text and focal points follow
 * "04 — MOSAC Photo, Source & Rights Register". Rights confirmed cleared on 17 Nov 2026.
 *
 * Files in /public/images are web copies (max 2400px, metadata stripped) of the originals in the
 * "MOSAC Images" folder. Originals stay in Drive. See public/images/README.md.
 */
const credit = "MOSAC archive"; // Photographer credits to be added per image when supplied.

export const media = {
  heroKigeziArch: {
    id: "asset-001",
    src: "/images/photos/kigezi-2022-night-arch.jpg",
    width: 2400,
    height: 1600,
    alt: "Rally car passing beneath the illuminated Kigezi Boona 2022 event arch at night.",
    event: "Kigezi Boona 2022",
    sourceFile: "KIGEZI BOONA 2022/IMG_7723.JPG",
    credit,
    focal: "45% 70%",
  },
  kigeziCelebration: {
    id: "asset-002",
    src: "/images/photos/kigezi-2022-celebration.jpg",
    width: 2400,
    height: 1600,
    alt: "Two men celebrating on a rally car with their trophies at a Kigezi Boona event.",
    event: "Kigezi Boona 2022",
    sourceFile: "KIGEZI BOONA 2022/IMG_9886.jpg",
    credit,
    focal: "55% 35%",
  },
  kigeziGroup: {
    id: "asset-003",
    src: "/images/photos/kigezi-2022-group.jpg",
    width: 2400,
    height: 1600,
    alt: "Group of people posing with a rally car at the Kigezi Boona event.",
    event: "Kigezi Boona 2022",
    sourceFile: "KIGEZI BOONA 2022/IMG_9966.jpg",
    credit,
    focal: "50% 45%",
  },
  kigeziCrew: {
    id: "asset-004",
    src: "/images/photos/kigezi-2022-crew.jpg",
    width: 2400,
    height: 1600,
    alt: "A service crew in overalls poses beside a rally car and support vehicle.",
    event: "Kigezi Boona 2022",
    sourceFile: "KIGEZI BOONA 2022/IMG_9692.jpg",
    credit,
    focal: "50% 55%",
  },
  kapeekaCrew: {
    id: "asset-005",
    src: "/images/photos/kapeeka-2019-race-suits.jpg",
    width: 2400,
    height: 1594,
    alt: "Two motorsport participants in orange race suits at an outdoor event.",
    event: "Kapeeka 2019",
    sourceFile: "KAPEEKA 2019/01.jpg",
    credit,
    focal: "50% 40%",
  },
  elgonStage: {
    id: "asset-006",
    src: "/images/photos/oryx-elgon-2018-stage.jpg",
    width: 2400,
    height: 1600,
    alt: "Green rally car crossing a red-earth course beside a waterway during an event.",
    event: "Oryx Elgon 2018",
    sourceFile: "ORYX ELGON  2018/DSC_0073.JPG",
    credit,
    focal: "80% 70%",
  },
  esportsPanel: {
    id: "asset-esports-panel",
    src: "/images/photos/esports-2026-launch-panel.jpg",
    width: 960,
    height: 1280,
    alt: "Panel speakers seated in front of the thinkIT FMU Esports Championship 2026 backdrop.",
    event: "thinkIT FMU Esports Championship 2026, press launch",
    sourceFile: "ESport Pressa 1.jpeg",
    credit,
    focal: "50% 60%",
  },
  esportsBackdrop: {
    id: "asset-009",
    src: "/images/photos/esports-2026-press-backdrop.jpg",
    width: 2400,
    height: 1600,
    alt: "Press backdrop for the thinkIT FMU Esports Championship 2026, behind event stools.",
    event: "thinkIT FMU Esports Championship 2026, press launch",
    sourceFile: "_12A0514.jpg",
    credit,
    focal: "55% 50%",
  },
  esportsRound2: {
    id: "asset-008",
    src: "/images/photos/esports-2026-round-2.jpg",
    width: 2400,
    height: 1600,
    alt: "A speaker addressing a small group in an indoor esports event room.",
    event: "thinkIT FMU Esports Championship 2026, Round 2",
    sourceFile: "DSC_3285.jpg",
    credit,
    focal: "60% 40%",
  },
  esportsProgrammes: {
    id: "asset-esports-programmes",
    src: "/images/photos/esports-2026-programmes.jpg",
    width: 1600,
    height: 1066,
    alt: "Programmes for the thinkIT FMU Esports Championship 2026 fanned out on a dark table.",
    event: "thinkIT FMU Esports Championship 2026",
    sourceFile: "ESport Pressa 6.jpeg",
    credit,
    focal: "70% 50%",
  },
  esportsLaunchGroup: {
    id: "asset-010",
    src: "/images/photos/esports-2026-launch-group.jpg",
    width: 1600,
    height: 1066,
    alt: "A group poses at Fun Station before the thinkIT FMU Esports Championship 2026 backdrop.",
    event: "thinkIT FMU Esports Championship 2026, press launch",
    sourceFile: "ESport Pressa 5.jpeg",
    credit,
    focal: "50% 40%",
  },
  esportsHandover: {
    id: "asset-esports-handover",
    src: "/images/photos/esports-2026-launch-handover.jpg",
    width: 1600,
    height: 1066,
    alt: "Partners hold championship programmes at the thinkIT FMU Esports Championship 2026 launch at Fun Station.",
    event: "thinkIT FMU Esports Championship 2026, press launch",
    sourceFile: "ESport Pressa 4.jpeg",
    credit,
    focal: "50% 40%",
  },
  // Esports hero: the press-launch backdrop (doc 04 asset 009). A photo of a driver on a simulator
  // would be stronger; doc 04 suggests one "from another curated round set".
  esportsHero: {
    id: "asset-esports-hero",
    src: "/images/photos/esports-2026-press-backdrop.jpg",
    width: 2400,
    height: 1600,
    alt: "Press backdrop for the thinkIT FMU Esports Championship 2026, with simulator screens alongside.",
    event: "thinkIT FMU Esports Championship 2026, press launch",
    sourceFile: "_12A0514.jpg",
    credit,
    focal: "55% 50%",
  },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

export function getMedia(key: string): MediaAsset | undefined {
  return (media as Record<string, MediaAsset>)[key] ?? archiveMedia[key];
}
