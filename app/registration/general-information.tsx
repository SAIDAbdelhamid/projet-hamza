import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {useHeaderHeight} from "@react-navigation/elements";
import {useTheme} from "@react-navigation/native";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect, useRef} from "react";
import {Controller, useForm} from "react-hook-form";
import {ScrollView, StyleSheet} from "react-native";
import {Input, Switch, XStack, YStack} from "tamagui";

type FormData = {
  username: string;
  firstname: string;
  lastname: string;
  phone: string;
  phone_hidden: boolean;
};

export default function GeneralInformation() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;
  const inputRefs = useRef<Record<string, Input | null>>({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.registration.generalInformation.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
    });
  });

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      phone: "",
      phone_hidden: false,
    },
  });
  const rules = {
    username: {required: t.registration.generalInformation.usernameRequired},
    phone: {
      pattern: {
        value: /^\+?[0-9]{7,15}$/,
        message: t.registration.generalInformation.phoneMatch,
      },
    },
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    router.navigate("/registration/account-type");
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
              <>
                <ThemedText
                  style={{
                    ...styles.caption,
                    color: error ? Colors[theme].error : Colors[theme].text,
                  }}
                  type="caption"
                >
                  {t.registration.generalInformation.username + " *"}
                </ThemedText>
                <Input
                  ref={(ref) => {
                    inputRefs.current.username = ref;
                  }}
                  size="$4"
                  placeholder={t.registration.generalInformation.username}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  returnKeyType="next"
                  borderColor={error ? Colors[theme].error : undefined}
                  onSubmitEditing={() => inputRefs.current.firstname?.focus()}
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
        </YStack>

        {/* Firstname */}
        <Controller
          name="firstname"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <ThemedText style={styles.caption} type="caption">
                {t.registration.generalInformation.firstname}
              </ThemedText>
              <Input
                ref={(ref) => {
                  inputRefs.current.firstname = ref;
                }}
                size="$4"
                placeholder={t.registration.generalInformation.firstname}
                value={value}
                autoComplete="given-name"
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={() => inputRefs.current.lastname?.focus()}
              />
            </>
          )}
        />

        {/* Lastname */}
        <Controller
          name="lastname"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <ThemedText style={styles.caption} type="caption">
                {t.registration.generalInformation.lastname}
              </ThemedText>
              <Input
                ref={(ref) => {
                  inputRefs.current.lastname = ref;
                }}
                size="$4"
                placeholder={t.registration.generalInformation.lastname}
                value={value}
                autoComplete="family-name"
                onChangeText={onChange}
                onBlur={onBlur}
                returnKeyType="next"
                onSubmitEditing={() => inputRefs.current.phone?.focus()}
              />
            </>
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          rules={rules.phone}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <>
              <ThemedText
                style={{
                  ...styles.caption,
                  color: error ? Colors[theme].error : Colors[theme].text,
                }}
                type="caption"
              >
                {t.registration.generalInformation.phoneNumber}
              </ThemedText>
              <Input
                ref={(ref) => {
                  inputRefs.current.phone = ref;
                }}
                size="$4"
                placeholder="+49 000 0000000"
                value={value}
                autoComplete="tel"
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="phone-pad"
                returnKeyType="done"
                onSubmitEditing={handleSubmit(onSubmit)}
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
                onCheckedChange={onChange}
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
  caption: {paddingBottom: 4, paddingTop: 20},
  label: {paddingRight: 12},
});
