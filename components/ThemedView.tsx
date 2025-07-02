import {ImageBackground, ImageBackgroundProps} from "react-native";

import {useThemeColor} from "@/hooks/useThemeColor";

export type ThemedViewProps = ImageBackgroundProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    {light: lightColor, dark: darkColor},
    "background"
  );

  return (
    <ImageBackground
      source={otherProps.source || require("../assets/images/background.png")}
      resizeMode="stretch"
      style={[style]}
      {...otherProps}
    />
  );
}
