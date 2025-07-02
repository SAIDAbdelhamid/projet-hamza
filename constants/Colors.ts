/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    gradientStart: "#61E6FB",
    gradientEnd: "#478CEC",
    text: "#11181C",
    background: "#fff",
    label: "#A2A2A2",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    error: "red",
    disabled: "#585858",
    border: "#343333",
    header: "#1E1D1D",
    modal: "#262525",
    select: "#232323",
    backgroundIntro: "#FFFFFF",
  },
  dark: {
    gradientStart: "#61E6FB",
    gradientEnd: "#478CEC",
    text: "#FFFFFF",
    background: "#151718",
    label: "#A2A2A2",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    error: "red",
    disabled: "#585858",
    border: "#343333",
    header: "#1E1D1D",
    modal: "#262525",
    select: "#232323",
    backgroundIntro: "#0B0B0B",
  },
};
