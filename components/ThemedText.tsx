import {Platform, StyleSheet, Text, type TextProps} from "react-native";

import {useThemeColor} from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "titleXL"
    | "title"
    | "subTitle"
    | "bodySmallMedium"
    | "labelBold"
    | "labelRegular"
    | "subTitleRegular"
    | "body"
    | "bodySmall"
    | "labelSemiBold"
    | "label"
    | "caption"
    | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({light: lightColor, dark: darkColor}, "text");

  return (
    <Text
      style={[
        {color},
        type === "default" ? styles.default : undefined,
        type === "titleXL" ? styles.titleXL : undefined,
        type === "title" ? styles.title : undefined,
        type === "subTitle" ? styles.subTitle : undefined,
        type === "bodySmallMedium" ? styles.bodySmallMedium : undefined,
        type === "labelBold" ? styles.labelBold : undefined,
        type === "labelRegular" ? styles.labelRegular : undefined,
        type === "subTitleRegular" ? styles.subTitleRegular : undefined,
        type === "body" ? styles.body : undefined,
        type === "bodySmall" ? styles.bodySmall : undefined,
        type === "labelSemiBold" ? styles.labelSemiBold : undefined,
        type === "label" ? styles.label : undefined,
        type === "caption" ? styles.caption : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    fontFamily: Platform.select({
      android: "Inter_400Regular",
      ios: "Inter-Regular",
    }),
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    fontFamily: Platform.select({
      android: "Inter_400Regular",
      ios: "Inter-Regular",
    }),
    color: "#0a7ea4",
  },
  titleXL: {
    fontSize: 36,
    fontFamily: Platform.select({
      android: "Inter_600SemiBold",
      ios: "Inter-SemiBold",
    }),
  },
  title: {
    fontSize: 24,
    fontFamily: Platform.select({
      android: "Inter_500Medium",
      ios: "Inter-Medium",
    }),
  },
  subTitle: {
    fontSize: 20,
    fontFamily: Platform.select({
      android: "Inter_500Medium",
      ios: "Inter-Medium",
    }),
  },
  bodySmallMedium: {
    fontSize: 16,
    fontFamily: Platform.select({
      android: "Inter_500Medium",
      ios: "Inter-Medium",
    }),
  },
  labelBold: {
    fontSize: 16,
    fontFamily: Platform.select({
      android: "Inter_600SemiBold",
      ios: "Inter-SemiBold",
    }),
  },
  labelRegular: {
    fontSize: 16,
    fontFamily: Platform.select({
      android: "Inter_400Regular",
      ios: "Inter-Regular",
    }),
  },
  subTitleRegular: {
    fontSize: 20,
    fontFamily: Platform.select({
      android: "Inter_400Regular",
      ios: "Inter-Regular",
    }),
  },
  body: {
    fontSize: 18,
    fontFamily: Platform.select({
      android: "Inter_400Regular",
      ios: "Inter-Regular",
    }),
  },
  bodySmall: {
    fontSize: 18,
    fontFamily: Platform.select({
      android: "Inter_400Regular",
      ios: "Inter-Regular",
    }),
  },
  labelSemiBold: {
    fontSize: 14,
    fontFamily: Platform.select({
      android: "Inter_600SemiBold",
      ios: "Inter-SemiBold",
    }),
  },
  label: {
    fontSize: 14,
    fontFamily: Platform.select({
      android: "Inter_400Regular",
      ios: "Inter-Regular",
    }),
  },
  caption: {
    fontSize: 12,
    fontFamily: Platform.select({
      android: "Inter_400Regular",
      ios: "Inter-Regular",
    }),
  },
});
