import {postRegister} from "@/api/apis";
import ws from "@/api/axiosConfig";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {RootState} from "@/store";
import {setRegistration} from "@/store/slices/registrationSlice";
import MaskedView from "@react-native-masked-view/masked-view";
import {useHeaderHeight} from "@react-navigation/elements";
import {useTheme} from "@react-navigation/native";
import {Check, ChevronLeft, LockKeyholeOpen} from "@tamagui/lucide-icons";
import {useNavigation, useRouter} from "expo-router";
import * as SecureStore from "expo-secure-store";
import {useLayoutEffect, useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Alert, ScrollView, StyleSheet, TextInput} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {View, XStack, YStack} from "tamagui";
import {LinearGradient} from "tamagui/linear-gradient";

type FormData = {
  password: string;
  password_confirm: string;
};

export default function CreatePassword() {
  const navigation = useNavigation();
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const {dark} = useTheme();
  const [loading, setLoading] = useState(false);
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;
  const inputRefs = useRef<Record<string, TextInput | null>>({});
  const registration = useSelector((state: RootState) => state.registration);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.registration.createPassword.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
      // animation: "slide_from_left",
      headerLeft: () => (
        <ChevronLeft
          onPress={() => {
            dispatch(
              setRegistration({
                ...registration,
                step: "EMAIL_STEP",
              })
            );
            router.replace({
              pathname: "/registration/email-step",
              params: {animation: "slide_from_left"},
            });
          }}
          marginRight={20}
          size={24}
        />
      ),
    });
  }, []);

  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      password: registration.password,
      password_confirm: registration.password_confirm,
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
      valid: passwordValue === getValues("password_confirm"),
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
    password_confirm: {
      required: t.registration.createPassword.confirmationPasswordRequired,
      validate: (value: string) =>
        value === getValues("password") ||
        t.registration.createPassword.passwordsMatch,
    },
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await postRegister({
        email: registration.email,
        email_hidden: registration.email_hidden,
        password: data.password,
        password_confirm: data.password_confirm,
      });
      if (response) {
        if (response.access_token) {
          ws.defaults.headers.common["Authorization"] =
            `Bearer ${response.access_token}`;
          await SecureStore.setItemAsync("access_token", response.access_token);
        }
        dispatch(
          setRegistration({
            ...registration,
            step: "EMAIL_OTP",
            password: data.password,
            password_confirm: data.password_confirm,
          })
        );
        router.replace({
          pathname: "/registration/email-otp",
          params: {animation: "slide_from_right"},
        });
      }
    } catch (e: any) {
      const error = e.response;
      Alert.alert(
        "Error " + error.status,
        Object.values(e.response.data).flat().join("\n")
      );
    } finally {
      setLoading(false);
    }
  };

  const onBlurState = ({
    password,
    password_confirm,
  }: {
    password?: string;
    password_confirm?: string;
  }) => {
    dispatch(
      setRegistration({
        ...registration,
        password: password ? password : registration.password,
        password_confirm: password_confirm
          ? password_confirm
          : registration.password_confirm,
      })
    );
  };

  return (
    <ThemedView style={{paddingTop: headerHeight, ...styles.container}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Controller
          name={"password"}
          control={control}
          rules={rules.password}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              ref={(ref) => {
                inputRefs.current.password = ref;
              }}
              isPassword
              label={t.registration.createPassword.password}
              leftIcon={
                <LockKeyholeOpen
                  size={22}
                  zIndex={1}
                  position="absolute"
                  top={10}
                  left={12}
                />
              }
              size="$4"
              autoFocus
              keyboardType={"default"}
              autoComplete="current-password"
              placeholder={t.registration.createPassword.passwordPlaceHolder}
              value={value ? value.toString() : undefined}
              onChangeText={onChange}
              onBlur={() => onBlurState({password: value})}
              error={
                error?.message ===
                t.registration.createPassword.passwordRequired
                  ? error
                  : undefined
              }
              returnKeyType={"next"}
              onSubmitEditing={() => {
                inputRefs.current.password_confirm?.focus();
              }}
            />
          )}
        />
        <Controller
          name={"password_confirm"}
          control={control}
          rules={rules.password_confirm}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              ref={(ref) => {
                inputRefs.current.password_confirm = ref;
              }}
              isPassword
              label={t.registration.createPassword.passwordConfirmation}
              leftIcon={
                <LockKeyholeOpen
                  size={22}
                  zIndex={1}
                  position="absolute"
                  top={10}
                  left={12}
                />
              }
              size="$4"
              keyboardType={"default"}
              autoComplete="current-password"
              placeholder={t.registration.createPassword.passwordConfirmation}
              value={value ? value.toString() : undefined}
              onChangeText={onChange}
              onBlur={() => onBlurState({password_confirm: value})}
              error={
                error?.message ===
                t.registration.createPassword.confirmationPasswordRequired
                  ? error
                  : undefined
              }
              returnKeyType={"send"}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
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

        <YStack flex={1} paddingBottom={20} justifyContent="flex-end">
          <PrimaryButton
            loading={loading}
            disabled={
              loading || !passwordRules.every((rule: any) => rule.valid)
            }
            onPress={handleSubmit(onSubmit)}
          >
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
});
