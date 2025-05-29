import {
  Quicksand as TitleFont,
  // Bricolage_Grotesque as TitleFont,
  // Lora as TitleFont,
  Dosis as SubtitleFont,
  // Bricolage_Grotesque as SubtitleFont,
  // Fira_Sans as SubtitleFont,
  // Inconsolata as SubtitleFont,
  Geist as BodyFont,
  // Nunito as BodyFont,
  // Montserrat as BodyFont,
  // Inter as BodyFont,
  // Lato as BodyFont,
  JetBrains_Mono as MonoFont,
} from "next/font/google";

export const titleFont = TitleFont({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const subtitleFont = SubtitleFont({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const bodyFont = BodyFont({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const monoFont = MonoFont({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
