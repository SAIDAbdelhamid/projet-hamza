import {postSendOtp, postVerifyOtp} from "@/api/apis";
import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {RootState} from "@/store";
import {setRegistration} from "@/store/slices/registrationSlice";
import {useHeaderHeight} from "@react-navigation/elements";
import {useTheme} from "@react-navigation/native";
import {ChevronLeft} from "@tamagui/lucide-icons";
import {useNavigation, useRouter} from "expo-router";
import {useEffect, useLayoutEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Alert, Platform, ScrollView, StyleSheet} from "react-native";
import {OtpInput} from "react-native-otp-entry";
import {useDispatch, useSelector} from "react-redux";
import {XStack, YStack} from "tamagui";

type FormData = {
  otp: string;
};

export default function EmailOtp() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;
  const registration = useSelector((state: RootState) => state.registration);
  const dispatch = useDispatch();
  const [secondsLeft, setSecondsLeft] = useState(60);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.registration.emailOtp.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
      // animation: "slide_from_left",
      headerLeft: () => (
        <ChevronLeft
          onPress={() => {
            dispatch(
              setRegistration({
                ...registration,
                step: "CREATE_PASSWORD",
              })
            );
            router.replace("/registration/create-password");
          }}
          marginRight={20}
          size={24}
        />
      ),
    });
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      otp: registration.otp,
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
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await postVerifyOtp({
        otp: data.otp,
        email: registration.email,
      });
      if (response.success) {
        dispatch(
          setRegistration({
            ...registration,
            step: "GENERAL_INFORMATION",
            otp: data.otp,
          })
        );
        router.replace("/registration/general-information");
      }
    } catch (e: any) {
      const error = e.response.data;
      Alert.alert(
        "Error " + error.statusCode,
        error.error + " : " + error.message
      );
    } finally {
      setLoading(false);
    }
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
                {t.registration.emailOtp.sendTo} «
                {registration.email[0].toLowerCase()}•••
                {extractDomain(registration.email)}»
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
                  onSubmitEditing: handleSubmit(onSubmit),
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
                  style={{color: Colors[theme].error, paddingTop: 4}}
                  type="caption"
                >
                  {error.message}
                </ThemedText>
              )}
            </>
          )}
        />
        <XStack>
          {secondsLeft === 0 ? (
            <ThemedText
              onPress={async () => {
                await postSendOtp({email: registration.email});
                setSecondsLeft(60);
              }}
              style={{...styles.resendCodeText, color: Colors[theme].label}}
              type="label"
            >
              {t.registration.emailOtp.resendCode}
            </ThemedText>
          ) : (
            <ThemedText type="labelSemiBold">
              {t.registration.emailOtp.attemptIn} {secondsLeft}s
            </ThemedText>
          )}
        </XStack>
        <YStack flex={1} paddingBottom={20} justifyContent="flex-end">
          <PrimaryButton
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
          >
            <ThemedText type="labelBold">
              {t.registration.common.continue}
            </ThemedText>
          </PrimaryButton>
        </YStack>
      </ScrollView>
    </ThemedView>
  );
}
function extractDomain(email: string) {
  const match = email.match(/@[\w.-]+\.[a-z]{2,}$/i);
  return match ? match[0] : null;
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
