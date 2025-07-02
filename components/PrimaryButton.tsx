import {Colors} from "@/constants/Colors";
import {useTheme} from "@react-navigation/native";
import React, {ReactNode} from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from "react-native";
import {LinearGradient} from "tamagui/linear-gradient";

type PrimaryButtonProps = TouchableHighlightProps & {
  children?: ReactNode;
};

export default function PrimaryButton({
  children,
  ...props
}: PrimaryButtonProps) {
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  return (
    <TouchableHighlight
      activeOpacity={0.9}
      {...props}
      style={{
        ...(props.style as any),
        borderRadius: (props.style as any)?.borderRadius || 15,
        height: (props.style as any)?.height || 48,
      }}
    >
      {props.disabled ? (
        <View
          style={{
            ...styles.disabledContainer,
            backgroundColor: Colors[theme].disabled,
            borderRadius: (props.style as any)?.borderRadius || 15,
          }}
        >
          {children}
        </View>
      ) : (
        <LinearGradient
          height="100%"
          width="100%"
          alignItems="center"
          justifyContent="center"
          borderRadius={(props.style as any)?.borderRadius || 15}
          colors={[Colors[theme].gradientStart, Colors[theme].gradientEnd]}
          start={[0, 0]}
          end={[0.05, 2]}
          locations={[0, 0.65]}
        >
          {children}
        </LinearGradient>
      )}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  disabledContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
