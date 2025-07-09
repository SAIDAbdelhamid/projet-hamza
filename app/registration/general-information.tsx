import {patchUser} from "@/api/apis";
import Input from "@/components/Input";
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
import {ChevronLeft, Phone} from "@tamagui/lucide-icons";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect, useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Alert, ScrollView, StyleSheet, TextInput} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Switch, XStack, YStack} from "tamagui";

type FormData = {
  username: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  phone_hidden: boolean;
};

export default function GeneralInformation() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;
  const inputRefs = useRef<Record<string, TextInput | null>>({});
  const [loading, setLoading] = useState(false);
  const registration = useSelector((state: RootState) => state.registration);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.registration.generalInformation.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
      // animation: "slide_from_left",
      headerLeft: () => (
        <ChevronLeft
          onPress={() => {
            dispatch(
              setRegistration({
                ...registration,
                step: "EMAIL_OTP",
              })
            );
            router.replace("/registration/email-otp");
          }}
          marginRight={20}
          size={24}
        />
      ),
    });
  }, []);

  const {control, handleSubmit, watch} = useForm<FormData>({
    defaultValues: {
      username: registration.username,
      firstname: registration.firstname,
      lastname: registration.lastname,
      phone_number: registration.phone_number,
      phone_hidden: !!registration.phone_hidden,
    },
  });

  const usernameValue = watch("username");

  const rules = {
    username: {required: t.registration.generalInformation.usernameRequired},
    phone_number: {
      pattern: {
        value: /^\+?[0-9]{7,15}$/,
        message: t.registration.generalInformation.phoneMatch,
      },
    },
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await patchUser({
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        phone_number: data.phone_number,
        phone_hidden: data.phone_hidden,
      });
      if (response) {
        dispatch(
          setRegistration({
            ...registration,
            step: "ACCOUNT_TYPE",
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            phone_number: data.phone_number,
            phone_hidden: data.phone_hidden,
          })
        );
        router.replace("/registration/account-type");
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

  return (
    <ThemedView style={{paddingTop: headerHeight, ...styles.container}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Username */}
        <YStack>
          <Controller
            name="username"
            control={control}
            rules={rules.username}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <Input
                ref={(ref) => {
                  inputRefs.current.username = ref;
                }}
                label={t.registration.generalInformation.username + " *"}
                size="$4"
                autoFocus
                placeholder={t.registration.generalInformation.username}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                borderColor={error ? Colors[theme].error : undefined}
                error={error}
                onSubmitEditing={() => inputRefs.current.firstname?.focus()}
              />
            )}
          />
        </YStack>

        {/* Firstname */}
        <Controller
          name="firstname"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              ref={(ref) => {
                inputRefs.current.firstname = ref;
              }}
              label={t.registration.generalInformation.firstname}
              size="$4"
              placeholder={t.registration.generalInformation.firstname}
              value={value}
              autoComplete="given-name"
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="next"
              onSubmitEditing={() => inputRefs.current.lastname?.focus()}
            />
          )}
        />

        {/* Lastname */}
        <Controller
          name="lastname"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              ref={(ref) => {
                inputRefs.current.lastname = ref;
              }}
              label={t.registration.generalInformation.lastname}
              size="$4"
              placeholder={t.registration.generalInformation.lastname}
              value={value}
              autoComplete="family-name"
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="next"
              onSubmitEditing={() => inputRefs.current.phone_number?.focus()}
            />
          )}
        />

        {/* Phone */}
        <Controller
          name="phone_number"
          control={control}
          rules={rules.phone_number}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              ref={(ref) => {
                inputRefs.current.phone_number = ref;
              }}
              label={t.registration.generalInformation.phoneNumber}
              size="$4"
              placeholder="+49 000 0000000"
              value={value}
              error={error}
              autoComplete="tel"
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="phone-pad"
              returnKeyType="done"
              onSubmitEditing={handleSubmit(onSubmit)}
              leftIcon={
                <Phone
                  size={22}
                  zIndex={1}
                  position="absolute"
                  top={11}
                  left={12}
                />
              }
            />
          )}
        />

        {/* Phone Hidden */}
        <XStack
          alignItems="center"
          justifyContent="space-between"
          marginTop={12}
          marginBottom={12}
        >
          <ThemedText style={styles.label} type="caption">
            {t.registration.generalInformation.phoneHidden}
          </ThemedText>
          <Controller
            name="phone_hidden"
            control={control}
            render={({field: {value, onChange}}) => (
              <Switch
                id="phone_hidden"
                size="$3"
                checked={!value}
                onCheckedChange={() => onChange(!value)}
              >
                <Switch.Thumb
                  animation="quick"
                  backgroundColor={Colors[theme].text}
                />
              </Switch>
            )}
          />
        </XStack>

        {/* Submit */}
        <YStack flex={1} paddingBottom={20} justifyContent="flex-end">
          <PrimaryButton
            loading={loading}
            disabled={loading || !usernameValue}
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

const styles = StyleSheet.create({
  container: {flex: 1},
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
    paddingTop: 40,
  },
  label: {paddingRight: 12},
});
