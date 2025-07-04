import TimelineItem from "@/components/IntroItem";
import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {RootState} from "@/store";
import {
  clearRegistration,
  setRegistration,
} from "@/store/slices/registrationSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect} from "react";
import {ImageBackground, StyleSheet, useWindowDimensions} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {YStack} from "tamagui";

export default function IntroScreen() {
  const t = false ? fr : en;
  const {height} = useWindowDimensions();
  const router = useRouter();
  const navigation = useNavigation();
  const registration = useSelector((state: RootState) => state.registration);
  const dispatch = useDispatch();

  AsyncStorage.getItem("persist:root").then((data) => {
    console.log("📦 Persisted data:", data);
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  });

  const onSubmit = () => {
    const redirectTo = {
      INTRO: "/registration/email-step",
      EMAIL_STEP: "/registration/email-step",
      EMAIL_OTP: "/registration/email-otp",
      CREATE_PASSWORD: "/registration/create-password",
      GENERAL_INFORMATION: "/registration/general-information",
      ACCOUNT_TYPE: "/registration/account-type",
      ACCOUNT_CATEGORIES: "/registration/account-categories",
      DONE: "/(app)/home",
    } as const;
    if (registration.step) {
      router.navigate(redirectTo[registration.step]);
    } else {
      dispatch(
        setRegistration({
          ...registration,
          step: "EMAIL_STEP",
        })
      );
      router.navigate("/registration/email-step");
    }
  };

  return (
    <>
      <ThemedView
        source={require("../../assets/images/background1.png")}
        style={styles.container}
      >
        <ImageBackground
          source={require("../../assets/images/header.png")}
          resizeMode="stretch"
          imageStyle={{minHeight: height * 0.4, width: "100%"}}
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
              checked={
                registration.step === "EMAIL_STEP" ||
                registration.step === "CREATE_PASSWORD" ||
                registration.step === "GENERAL_INFORMATION" ||
                registration.step === "ACCOUNT_TYPE" ||
                registration.step === "ACCOUNT_CATEGORIES"
              }
              number={1}
              text={t.registration.intro.step1}
            />
            <TimelineItem
              checked={
                registration.step === "CREATE_PASSWORD" ||
                registration.step === "GENERAL_INFORMATION" ||
                registration.step === "ACCOUNT_TYPE" ||
                registration.step === "ACCOUNT_CATEGORIES"
              }
              number={2}
              text={t.registration.intro.step2}
            />
            <TimelineItem
              checked={
                registration.step === "GENERAL_INFORMATION" ||
                registration.step === "ACCOUNT_TYPE" ||
                registration.step === "ACCOUNT_CATEGORIES"
              }
              number={3}
              text={t.registration.intro.step3}
            />
            <TimelineItem
              checked={
                registration.step === "ACCOUNT_TYPE" ||
                registration.step === "ACCOUNT_CATEGORIES"
              }
              isLast={true}
              number={4}
              text={t.registration.intro.step4}
            />
            {/* <TimelineItem
              number={5}
              checked={registration.step === "ACCOUNT_CATEGORIES"}
              text={t.registration.intro.step5}
              isLast={true}
            /> */}
          </YStack>
          <PrimaryButton
            onLongPress={() => dispatch(clearRegistration())}
            onPress={onSubmit}
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
    height: "100%",
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 40,
    paddingTop: 0,
    justifyContent: "space-between",
  },
  titleContainer: {paddingLeft: 16, paddingRight: 16},
  timelineContainer: {alignItems: "flex-start"},
  title: {textAlign: "center", paddingBottom: 12},
  textAlign: {textAlign: "center"},
});
