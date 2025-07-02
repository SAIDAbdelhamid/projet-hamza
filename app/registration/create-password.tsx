import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import MaskedView from "@react-native-masked-view/masked-view";
import {useHeaderHeight} from "@react-navigation/elements";
import {useTheme} from "@react-navigation/native";
import {Check} from "@tamagui/lucide-icons";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect, useRef} from "react";
import {Controller, useForm} from "react-hook-form";
import {ScrollView, StyleSheet} from "react-native";
import {Input, View, XStack, YStack} from "tamagui";
import {LinearGradient} from "tamagui/linear-gradient";

type FormData = {
  password: string;
  password_confirmation: string;
};

export default function CreatePassword() {
  const navigation = useNavigation();
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;
  const inputRefs = useRef<Record<string, Input | null>>({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.registration.createPassword.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
    });
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const passwordValue = watch("password");

  const passwordRules = [
    {
      label: t.registration.createPassword.lengthMatch,
      valid: passwordValue?.length >= 8,
    },
    {
      label: t.registration.createPassword.uppercaseMatch,
      valid: /[A-Z]/.test(passwordValue),
    },
    {
      label: t.registration.createPassword.lowercaseMatch,
      valid: /[a-z]/.test(passwordValue),
    },
    {
      label: t.registration.createPassword.numberMatch,
      valid: /[0-9]/.test(passwordValue),
    },
    {
      label: t.registration.createPassword.specialCharacterMatch,
      valid: /[#!?@$%^&*-]/.test(passwordValue),
    },
    {
      label: t.registration.createPassword.passwordConfirmation,
      valid: passwordValue === getValues("password_confirmation"),
    },
  ];

  const rules = {
    password: {
      required: t.registration.createPassword.passwordRequired,
      validate: {
        minLength: (v: string) =>
          v.length >= 8 || t.registration.createPassword.lengthMatch,
        hasUpper: (v: string) =>
          /[A-Z]/.test(v) || t.registration.createPassword.uppercaseMatch,
        hasLower: (v: string) =>
          /[a-z]/.test(v) || t.registration.createPassword.lowercaseMatch,
        hasNumber: (v: string) =>
          /[0-9]/.test(v) || t.registration.createPassword.numberMatch,
        hasSpecial: (v: string) =>
          /[#!?@$%^&*-]/.test(v) ||
          t.registration.createPassword.specialCharacterMatch,
      },
    },
    password_confirmation: {
      required: t.registration.createPassword.confirmationPasswordRequired,
      validate: (value: string) =>
        value === getValues("password") ||
        t.registration.createPassword.passwordsMatch,
    },
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    router.navigate("/registration/general-information");
  };

  return (
    <ThemedView style={{paddingTop: headerHeight, ...styles.container}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Controller
          name={"password"}
          control={control}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <>
              <ThemedText
                style={{
                  ...styles.caption,
                  color: error ? Colors[theme].error : Colors[theme].text,
                }}
                type="caption"
              >
                {t.registration.createPassword.password}
              </ThemedText>
              <Input
                ref={(ref) => {
                  inputRefs.current.password = ref;
                }}
                size="$4"
                keyboardType={"default"}
                secureTextEntry
                autoComplete="current-password"
                placeholder={t.registration.createPassword.passwordPlaceHolder}
                value={value ? value.toString() : undefined}
                onChangeText={onChange}
                onBlur={onBlur}
                borderColor={error ? Colors[theme].error : undefined}
                returnKeyType={"next"}
                onSubmitEditing={() => {
                  inputRefs.current.password_confirmation?.focus();
                }}
              />
              {error?.message ===
                t.registration.createPassword.passwordRequired && (
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
        <Controller
          name={"password_confirmation"}
          control={control}
          rules={rules.password_confirmation}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <>
              <ThemedText
                style={{
                  ...styles.caption,
                  color: error ? Colors[theme].error : Colors[theme].text,
                }}
                type="caption"
              >
                {t.registration.createPassword.passwordConfirmation}
              </ThemedText>
              <Input
                ref={(ref) => {
                  inputRefs.current.password_confirmation = ref;
                }}
                size="$4"
                keyboardType={"default"}
                secureTextEntry
                autoComplete="current-password"
                placeholder={t.registration.createPassword.passwordConfirmation}
                value={value ? value.toString() : undefined}
                onChangeText={onChange}
                onBlur={onBlur}
                borderColor={error ? Colors[theme].error : undefined}
                returnKeyType={"send"}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
              {error?.message ===
                t.registration.createPassword.confirmationPasswordRequired && (
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
        <YStack gap="$2" paddingTop={20}>
          {passwordRules.map((rule, index) => (
            <YStack
              key={index}
              flexDirection="row"
              alignItems="center"
              gap="$2"
            >
              <XStack>
                {rule.valid ? (
                  <MaskedView maskElement={<Check size={16} marginLeft={2} />}>
                    <LinearGradient
                      height={16}
                      width={16}
                      margin={4}
                      colors={[
                        Colors[theme].gradientStart,
                        Colors[theme].gradientEnd,
                      ]}
                      start={[0, 0]}
                      end={[0.05, 2]}
                      locations={[0, 0.65]}
                    />
                  </MaskedView>
                ) : (
                  <View
                    backgroundColor={"#343333"}
                    height={6}
                    width={6}
                    borderRadius={6}
                    margin={9}
                  />
                )}
                <ThemedText style={{color: Colors[theme].text, paddingLeft: 4}}>
                  {rule.label}
                </ThemedText>
              </XStack>
            </YStack>
          ))}
        </YStack>

        <YStack flex={1} paddingBottom={40} justifyContent="flex-end">
          <PrimaryButton onPress={handleSubmit(onSubmit)}>
            <ThemedText type="labelBold">
              {t.registration.createPassword.createPassword}
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
  caption: {paddingBottom: 4, paddingTop: 20},
});
