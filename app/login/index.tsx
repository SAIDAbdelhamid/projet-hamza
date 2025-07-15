import {postLogin} from "@/api/apis";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {RootState} from "@/store";
import {setUser} from "@/store/slices/userSlice";
import {useHeaderHeight} from "@react-navigation/elements";
import {useTheme} from "@react-navigation/native";
import {LockKeyholeOpen, Mail} from "@tamagui/lucide-icons";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect, useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Alert, ScrollView, StyleSheet, TextInput} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {YStack} from "tamagui";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigation = useNavigation();
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const {dark} = useTheme();
  const [loading, setLoading] = useState(false);
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;
  // const {t} = useTranslate()
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const inputRefs = useRef<Record<string, TextInput | null>>({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.login.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
    });
  }, []);

  const {control, handleSubmit, watch} = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const rules = {
    email: {
      required: t.login.emailMatch,
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: t.login.emailValid,
      },
    },
    password: {
      required: t.login.passwordRequired,
    },
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const userInfo = await postLogin({
        email: data.email,
        password: data.password,
      });
      dispatch(
        setUser({
          ...user,
          ...userInfo,
        })
      );
      router.replace("/(app)/home");
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

  return (
    <ThemedView style={{paddingTop: headerHeight, ...styles.container}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ThemedText style={{paddingBottom: 4, paddingTop: 4}} type="title">
          {t.login.title}
        </ThemedText>
        <Controller
          name={"email"}
          control={control}
          rules={rules.email}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              label={t.login.email}
              leftIcon={
                <Mail
                  size={22}
                  zIndex={1}
                  position="absolute"
                  top={11}
                  left={12}
                />
              }
              size="$4"
              keyboardType="email-address"
              autoComplete="email"
              autoFocus
              placeholder={t.login.emailPlaceholder}
              value={value ? value.toString() : undefined}
              onChangeText={onChange}
              onBlur={onBlur}
              error={error}
              returnKeyType={"next"}
              onSubmitEditing={() => {
                inputRefs.current.password?.focus();
              }}
            />
          )}
        />

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
              label={t.login.password}
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
              placeholder={t.login.passwordPlaceHolder}
              value={value ? value.toString() : undefined}
              onChangeText={onChange}
              onBlur={onBlur}
              error={
                error?.message === t.login.passwordRequired ? error : undefined
              }
              returnKeyType={"done"}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
        />
        <YStack flex={1} paddingBottom={20} justifyContent="flex-end">
          <PrimaryButton
            loading={loading}
            disabled={loading || !emailValue || !passwordValue}
            onPress={handleSubmit(onSubmit)}
          >
            <ThemedText type="labelBold">{t.login.title}</ThemedText>
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
