import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {useHeaderHeight} from "@react-navigation/elements";
import {useTheme} from "@react-navigation/native";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect} from "react";
import {Controller, useForm} from "react-hook-form";
import {Platform, ScrollView, StyleSheet} from "react-native";
import {OtpInput} from "react-native-otp-entry";
import {XStack, YStack} from "tamagui";

type FormData = {
  otp: string;
};

export default function EmailOtp() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.registration.emailOtp.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
    });
  });

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      otp: "",
    },
  });

  const rules = {
    otp: {
      required: t.registration.emailOtp.otpMatch,
      pattern: {
        value: /^\d{6}$/,
        message: t.registration.emailOtp.lengthMatch,
      },
    },
  };
  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    router.navigate("/registration/create-password");
  };

  return (
    <ThemedView style={{paddingTop: headerHeight, ...styles.container}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Controller
          name={"otp"}
          control={control}
          rules={rules.otp}
          render={({field: {onChange, onBlur}, fieldState: {error}}) => (
            <>
              <ThemedText
                style={{
                  color: error ? Colors[theme].error : Colors[theme].text,
                }}
                type="labelRegular"
              >
                {t.registration.emailOtp.sendTo} t•••@gmail.com»
              </ThemedText>
              <OtpInput
                numberOfDigits={6}
                focusColor={Colors[theme].text}
                autoFocus={true}
                hideStick={true}
                blurOnFilled={true}
                disabled={false}
                type="numeric"
                secureTextEntry={false}
                focusStickBlinkingDuration={500}
                onBlur={onBlur}
                onTextChange={onChange}
                onFilled={onChange}
                textInputProps={{
                  accessibilityLabel: "One-Time Password",
                }}
                textProps={{
                  accessibilityRole: "text",
                  accessibilityLabel: "OTP digit",
                  allowFontScaling: false,
                }}
                theme={{
                  containerStyle: styles.containerStyle,
                  pinCodeContainerStyle: {
                    ...styles.pinCodeContainerStyle,
                    borderColor: error
                      ? Colors[theme].error
                      : Colors[theme].text,
                  },
                  pinCodeTextStyle: {
                    ...styles.pinCodeTextStyle,
                    color: Colors[theme].text,
                  },
                  focusedPinCodeContainerStyle: {
                    ...styles.focusedPinCodeContainerStyle,
                    borderColor: error
                      ? Colors[theme].error
                      : Colors[theme].text,
                  },
                }}
              />
              {error && (
                <ThemedText
                  style={{color: Colors[theme].error, paddingBottom: 4}}
                  type="caption"
                >
                  {error.message}
                </ThemedText>
              )}
            </>
          )}
        />
        <XStack>
          <ThemedText
            style={{...styles.resendCodeText, color: Colors[theme].label}}
            type="label"
          >
            {t.registration.emailOtp.resendCode}
          </ThemedText>
          <ThemedText type="labelSemiBold">59s</ThemedText>
        </XStack>
        <YStack flex={1} paddingBottom={40} justifyContent="flex-end">
          <PrimaryButton onPress={handleSubmit(onSubmit)}>
            <ThemedText type="labelBold">
              {t.registration.common.continue}
            </ThemedText>
          </PrimaryButton>
        </YStack>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
    paddingTop: 40,
  },
  containerStyle: {alignSelf: "center", padding: 20},
  pinCodeContainerStyle: {height: 46},
  pinCodeTextStyle: {
    fontSize: 36,
    fontFamily: Platform.select({
      android: "Inter_600SemiBold",
      ios: "Inter-SemiBold",
    }),
  },
  focusedPinCodeContainerStyle: {
    borderWidth: 2,
  },
  resendCodeText: {paddingRight: 4},
});
