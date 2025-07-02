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
import {ScrollView, StyleSheet} from "react-native";
import {Input, Switch, XStack, YStack} from "tamagui";

type FormData = {
  email: string;
  email_hidden: boolean;
};

export default function EmailStep() {
  const navigation = useNavigation();
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.registration.emailStep.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
    });
  });

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      email: "",
      email_hidden: false,
    },
  });

  const rules = {
    email: {
      required: t.registration.emailStep.emailMatch,
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: t.registration.emailStep.emailValid,
      },
    },
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    router.navigate("/registration/email-otp");
  };

  return (
    <ThemedView style={{paddingTop: headerHeight, ...styles.container}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Controller
          name={"email"}
          control={control}
          rules={rules.email}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <>
              <ThemedText
                style={{
                  ...styles.caption,
                  color: error ? Colors[theme].error : Colors[theme].text,
                }}
                type="caption"
              >
                {t.registration.emailStep.email}
              </ThemedText>
              <Input
                size="$4"
                keyboardType="email-address"
                autoComplete="email"
                placeholder={t.registration.emailStep.emailPlaceholder}
                value={value ? value.toString() : undefined}
                onChangeText={onChange}
                onBlur={onBlur}
                borderColor={error ? Colors[theme].error : undefined}
                returnKeyType={"send"}
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

        <XStack
          alignItems="center"
          justifyContent="space-between"
          marginTop={12}
          marginBottom={12}
        >
          <ThemedText style={styles.label} type="caption">
            {t.registration.emailStep.showEmail}
          </ThemedText>
          <Controller
            name="email_hidden"
            control={control}
            render={({field: {value, onChange}}) => (
              <Switch
                id="email_hidden"
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

        <YStack flex={1} paddingBottom={40} justifyContent="flex-end">
          <PrimaryButton onPress={handleSubmit(onSubmit)}>
            <ThemedText type="labelBold">
              {t.registration.emailStep.confirmMail}
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
