// store/themes.ts

import { ThemeState, defaultTheme } from "./slices/themeSlice";

export type ThemePreset = {
  name: string;
  theme: ThemeState;
};

export const themePresets: ThemePreset[] = [
  {
    name: "Midnight Violet",
    theme: defaultTheme,
  },

  {
    name: "Neon Tokyo",
    theme: {
      visualizerBgColor: "#10204A",
      visualizerBarColor: "#FF4ECD",
      sidebarBgColor: "#162B5F",
      textColor: "#E8EBFF",
      buttonBgColor: "#22D3EE",
      listColor: "#142C5A",
      listTextColor: "#E8EBFF",
      popupBgColor: "#102A5C",
      popupTextColor: "#E8EBFF",
      popupButtonColor: "#FF4ECD",
    },
  },

  {
    name: "Ocean Depth",
    theme: {
      visualizerBgColor: "#0E3B61",
      visualizerBarColor: "#33C7E8",
      sidebarBgColor: "#104C73",
      textColor: "#E8FBFF",
      buttonBgColor: "#2BB6D7",
      listColor: "#0F537A",
      listTextColor: "#E8FBFF",
      popupBgColor: "#0F537A",
      popupTextColor: "#E8FBFF",
      popupButtonColor: "#33C7E8",
    },
  },

  {
    name: "Tokyo Sunset",
    theme: {
      visualizerBgColor: "#1A3565",
      visualizerBarColor: "#FB8B3E",
      sidebarBgColor: "#223B6F",
      textColor: "#FFF3E5",
      buttonBgColor: "#F97316",
      listColor: "#284F7F",
      listTextColor: "#FFF3E5",
      popupBgColor: "#2A4F8A",
      popupTextColor: "#FFF3E5",
      popupButtonColor: "#FB8B3E",
    },
  },

  {
    name: "Matcha",
    theme: {
      visualizerBgColor: "#21392A",
      visualizerBarColor: "#A3E635",
      sidebarBgColor: "#29402E",
      textColor: "#F4FBE4",
      buttonBgColor: "#65A30D",
      listColor: "#2F4735",
      listTextColor: "#F4FBE4",
      popupBgColor: "#2F4735",
      popupTextColor: "#F4FBE4",
      popupButtonColor: "#A3E635",
    },
  },

  {
    name: "Crimson Velvet",
    theme: {
      visualizerBgColor: "#381B25",
      visualizerBarColor: "#F43F5E",
      sidebarBgColor: "#462431",
      textColor: "#FDF3F5",
      buttonBgColor: "#EF4444",
      listColor: "#4D2D39",
      listTextColor: "#FDF3F5",
      popupBgColor: "#4D2D39",
      popupTextColor: "#FDF3F5",
      popupButtonColor: "#F43F5E",
    },
  },

  {
    name: "Sakura Night",
    theme: {
      visualizerBgColor: "#37214B",
      visualizerBarColor: "#F472B6",
      sidebarBgColor: "#4C2A5B",
      textColor: "#FFF1F7",
      buttonBgColor: "#EC4899",
      listColor: "#513061",
      listTextColor: "#FFF1F7",
      popupBgColor: "#513061",
      popupTextColor: "#FFF1F7",
      popupButtonColor: "#F472B6",
    },
  },

  {
    name: "Obsidian Gold",
    theme: {
      visualizerBgColor: "#3D2F22",
      visualizerBarColor: "#F59E0B",
      sidebarBgColor: "#4E3C29",
      textColor: "#FEF6E7",
      buttonBgColor: "#D97706",
      listColor: "#5E4936",
      listTextColor: "#FEF6E7",
      popupBgColor: "#5E4936",
      popupTextColor: "#FEF6E7",
      popupButtonColor: "#F59E0B",
    },
  },

  {
    name: "Coffee House",
    theme: {
      visualizerBgColor: "#3A2A21",
      visualizerBarColor: "#D6A15D",
      sidebarBgColor: "#493729",
      textColor: "#F7EFE4",
      buttonBgColor: "#B58359",
      listColor: "#5A463A",
      listTextColor: "#F7EFE4",
      popupBgColor: "#5A463A",
      popupTextColor: "#F7EFE4",
      popupButtonColor: "#D6A15D",
    },
  },

  {
    name: "Moonlight",
    theme: {
      visualizerBgColor: "#F8FAFC",
      visualizerBarColor: "#4F46E5",
      sidebarBgColor: "#EEF2FF",
      textColor: "#1F2937",
      buttonBgColor: "#6366F1",
      listColor: "#FFFFFF",
      listTextColor: "#1F2937",
      popupBgColor: "#FFFFFF",
      popupTextColor: "#1F2937",
      popupButtonColor: "#6366F1",
    },
  },

  {
    name: "Synthwave",
    theme: {
      visualizerBgColor: "#3B1B4E",
      visualizerBarColor: "#FF58BC",
      sidebarBgColor: "#4E1A6D",
      textColor: "#FAF5FF",
      buttonBgColor: "#8B5CF6",
      listColor: "#5A266F",
      listTextColor: "#FAF5FF",
      popupBgColor: "#5A266F",
      popupTextColor: "#FAF5FF",
      popupButtonColor: "#FF4ECD",
    },
  },
];