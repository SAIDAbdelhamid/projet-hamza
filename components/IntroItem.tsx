import {Colors} from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaskedView from "@react-native-masked-view/masked-view";
import {useTheme} from "@react-navigation/native";
import React from "react";
import {View, XStack, YStack} from "tamagui";
import {LinearGradient} from "tamagui/linear-gradient";
import {ThemedText} from "./ThemedText";

export default function TimelineItem({
  isLast = false,
  checked = false,
  number,
  text,
}: {
  isLast?: boolean;
  checked?: boolean;
  number: string | number;
  text: string;
}) {
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";

  return (
    <YStack>
      <XStack alignItems="center">
        {checked ? (
          <LinearGradient
            height={32}
            width={32}
            alignItems="center"
            marginRight={20}
            marginLeft={15}
            justifyContent="center"
            borderRadius={16}
            colors={[Colors[theme].gradientStart, Colors[theme].gradientEnd]}
            start={[0, 0]}
            end={[0.05, 2]}
            locations={[0, 0.65]}
          >
            <FontAwesome6 name="check" size={16} color="black" />
          </LinearGradient>
        ) : (
          <LinearGradient
            height={32}
            width={32}
            alignItems="center"
            marginRight={20}
            marginLeft={15}
            justifyContent="center"
            borderRadius={16}
            colors={[Colors[theme].gradientStart, Colors[theme].gradientEnd]}
            start={[0, 0]}
            end={[0.05, 2]}
            locations={[0, 0.65]}
          >
            <View
              height={28}
              width={28}
              borderRadius={14}
              alignItems="center"
              justifyContent="center"
              backgroundColor={Colors[theme].backgroundIntro}
            >
              <MaskedView
                maskElement={
                  <View
                    height={28}
                    width={28}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <ThemedText type="body">{number}</ThemedText>
                  </View>
                }
              >
                <LinearGradient
                  height={28}
                  width={28}
                  colors={[
                    Colors[theme].gradientStart,
                    Colors[theme].gradientEnd,
                  ]}
                  start={[0, 0]}
                  end={[0.05, 2]}
                  locations={[0, 0.65]}
                ></LinearGradient>
              </MaskedView>
            </View>
          </LinearGradient>
        )}
        <ThemedText style={{textAlign: "center"}} type="body">
          {text}
        </ThemedText>
      </XStack>
      {!isLast && (
        <XStack alignItems="center">
          <View
            height={20}
            width={32}
            marginLeft={15}
            marginRight={20}
            alignItems="center"
            justifyContent="center"
          >
            <View
              height={20}
              width={2}
              backgroundColor={Colors[theme].gradientEnd}
            />
          </View>
        </XStack>
      )}
    </YStack>
  );
}
