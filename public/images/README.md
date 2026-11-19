# Photos

Web copies of the originals in the "MOSAC Images" folder (resized to max 2400 px, camera metadata
removed). Keep the full-size originals in Drive. Selections follow "04 — MOSAC Photo, Source & Rights Register".

| File in `photos/` | Original | Used for |
| --- | --- | --- |
| kigezi-2022-night-arch.jpg | KIGEZI BOONA 2022/IMG_7723.JPG | Homepage hero |
| kigezi-2022-celebration.jpg | KIGEZI BOONA 2022/IMG_9886.jpg | People hero, gallery |
| kigezi-2022-group.jpg | KIGEZI BOONA 2022/IMG_9966.jpg | About, community |
| kigezi-2022-crew.jpg | KIGEZI BOONA 2022/IMG_9692.jpg | Homepage "next chapter" |
| kapeeka-2019-race-suits.jpg | KAPEEKA 2019/01.jpg | Motorsport, events |
| oryx-elgon-2018-stage.jpg | ORYX ELGON  2018/DSC_0073.JPG | Rally heritage, history |
| esports-2026-launch-group.jpg | ESport Pressa 5.jpeg | Esports, news |
| esports-2026-launch-panel.jpg | ESport Pressa 1.jpeg | Esports, people |
| esports-2026-launch-handover.jpg | ESport Pressa 4.jpeg | Gallery |
| esports-2026-press-backdrop.jpg | ESport Pressa 2.jpeg | Esports |
| esports-2026-programmes.jpg | ESport Pressa 6.jpeg | Esports hero (interim) |

Archive galleries (5–9 photos per event) are in `public/images/archive/`, listed in
`src/content/archive-media.ts` with the original file name for each.

**Still wanted:** a photo of a driver racing on a simulator (Round 1 or Round 2 folders in
"Esports Working Documents / 02 Media") to replace the interim esports hero.

To swap a photo, save it under a new file name in `photos/` and change `src` in `src/content/media.ts`
(a new name avoids the browser and Next.js showing a cached copy of the old photo). Adjust `focal` there if a crop cuts off the subject.
