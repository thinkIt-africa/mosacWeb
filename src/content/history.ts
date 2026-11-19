import type { Milestone } from "@/types/content";

/** Timeline from "01 — MOSAC Website_ Complete Page Copy & Editorial Content", section 03. */
export const milestones: Milestone[] = [
  {
    year: "1990",
    title: "The beginning",
    text: "Founding year confirmed by the FMU club profile. Founder names from the club brief require archival confirmation.",
    verification: "verified-public",
    source: { label: "FMU club profile", url: "https://motorsportuganda.com/motorsport-africa-club-mosac/" },
  },
  {
    year: "2009",
    title: "The MOSAC Sprint",
    text: "A Uganda statutory instrument refers to a MOSAC Sprint scheduled for 8 November 2009 at Festino Cite, Mukono District.",
    verification: "verified-public",
    source: {
      label: "Uganda Gazette, 30 Oct 2009",
      url: "https://archive.gazettes.africa/archive/ug/2009/ug-government-gazette-dated-2009-10-30-no-53.pdf",
    },
  },
  {
    year: "2017",
    title: "Oryx Lukaya",
    text: "The supplied club photo archive preserves a rally collection bearing this event name.",
    verification: "pending",
  },
  {
    year: "2018",
    title: "Oryx Elgon",
    text: "The archive preserves rally images; subsequent coverage recalls the Mbale event as the title-deciding round in Susan Muwonge’s championship season.",
    verification: "pending",
  },
  {
    year: "2019",
    title: "Kapeeka Autocross",
    text: "Press coverage records Rajiv Ruparelia taking victory in a MOSAC event in Nakaseke, with more than 30 crews participating.",
    verification: "verified-public",
    source: {
      label: "Eagle Online",
      url: "https://eagle.co.ug/2019/08/19/rajiv-wins-mosac-autocross-championship-in-kapeeka/",
    },
  },
  {
    year: "2021",
    title: "Jinja championship event",
    text: "MOSAC organised the late-November championship rally in Jinja.", // 01 adds the historic event branding; 04 asks for the respectful display name instead
    verification: "pending",
  },
  {
    year: "2022",
    title: "Kigezi Boona",
    text: "MOSAC organised a title-deciding rally in the Rukungiri area. Byron Rugomoka and navigator Hakim Mwanda won. Reporting also described remembrance of Wilberforce Pole Pole and intended community support.",
    verification: "verified-public",
    source: {
      label: "Uganda Radio Network",
      url: "https://www.ugandaradionetwork.net/story/rugomoka-wins-kigezi-boona-motor-rally-",
    },
  },
  {
    year: "2024",
    title: "Kabalega Rally",
    text: "FMU described the Hoima event of 22–24 November as co-organised by MOSAC and UMOSPOC.",
    verification: "verified-public",
    source: { label: "FMU", url: "https://motorsportuganda.com/kabalega-rally-hoima-2024/" },
  },
  {
    year: "2025",
    title: "Digital motorsport",
    text: "FMU’s four-round rally simulation championship crowned Isaac ‘Jua Kali’ Katende.",
    verification: "verified-public",
    source: {
      label: "FIA",
      url: "https://www.fia.com/news/esports-championship-organised-ugandan-asn-promotes-motor-sport-participation",
    },
  },
  {
    year: "2026",
    title: "A new start line",
    text: "MOSAC was named technical organiser for the thinkIT FMU Esports Championship, with FMU sanctioning the series.",
    verification: "verified-public",
    source: {
      label: "NBS Sport",
      url: "https://nbssport.co.ug/article/thinkit-named-lead-sponsor-for-fmu-esports-championship",
    },
  },
];
