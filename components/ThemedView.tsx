import {ImageBackground, type ViewProps} from "react-native";

import {useThemeColor} from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
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
      source={require("../assets/images/background.png")}
      resizeMode="stretch"
      style={[style]}
      {...otherProps}
    />
  );
}
