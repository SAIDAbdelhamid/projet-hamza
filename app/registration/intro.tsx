import TimelineItem from "@/components/IntroItem";
import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect} from "react";
import {ImageBackground, StyleSheet} from "react-native";
import {YStack} from "tamagui";

export default function IntroScreen() {
  const t = false ? fr : en;
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  });

  return (
    <>
      <ThemedView
        source={require("../../assets/images/background1.png")}
        style={styles.container}
      >
        <ImageBackground
          source={require("../../assets/images/header.png")}
          resizeMode="stretch"
          imageStyle={{height: 380, width: "100%"}}
        />
        <YStack style={styles.content}>
          <YStack flex={0.6} />
          <YStack style={styles.titleContainer}>
            <ThemedText style={styles.title} type="titleXL">
              {t.registration.intro.title}
            </ThemedText>
            <ThemedText style={styles.textAlign} type="subTitleRegular">
              {t.registration.intro.subTitle}
            </ThemedText>
          </YStack>
          <YStack style={styles.timelineContainer}>
            <TimelineItem
              checked={true}
              number={1}
              text={t.registration.intro.step1}
            />
            <TimelineItem number={2} text={t.registration.intro.step2} />
            <TimelineItem number={3} text={t.registration.intro.step3} />
            <TimelineItem number={4} text={t.registration.intro.step4} />
            <TimelineItem
              number={4}
              text={t.registration.intro.step5}
              isLast={true}
            />
          </YStack>
          <PrimaryButton
            onPress={() => router.navigate("/registration/email-step")}
          >
            <ThemedText type="labelBold">
              {t.registration.common.continue}
            </ThemedText>
          </PrimaryButton>
        </YStack>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    // flex:1
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 60,
    paddingTop: 0,
    justifyContent: "space-between",
  },
  titleContainer: {paddingLeft: 32, paddingRight: 32},
  timelineContainer: {alignItems: "flex-start"},
  title: {textAlign: "center", paddingBottom: 12},
  textAlign: {textAlign: "center"},
});
