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
import {ChevronLeft, Mail} from "@tamagui/lucide-icons";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {ScrollView, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Switch, XStack, YStack} from "tamagui";

type FormData = {
  email: string;
  email_hidden: boolean;
};

export default function EmailStep() {
  const navigation = useNavigation();
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const {dark} = useTheme();
  const [loading, setLoading] = useState(false);
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;
  const registration = useSelector((state: RootState) => state.registration);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.registration.emailStep.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
      headerLeft: () => (
        <ChevronLeft
          onPress={() =>
            navigation.canGoBack()
              ? navigation.goBack()
              : router.replace("/registration/intro")
          }
          marginRight={20}
          size={24}
        />
      ),
    });
  });

  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      email: registration.email,
      email_hidden: registration.email_hidden,
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

  const onSubmit = async (data: FormData) => {
    dispatch(
      setRegistration({
        ...registration,
        step: "CREATE_PASSWORD",
        email: data.email,
        email_hidden: data.email_hidden,
      })
    );
    router.navigate("/registration/create-password");
  };

  return (
    <ThemedView style={{paddingTop: headerHeight, ...styles.container}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Controller
          name={"email"}
          control={control}
          rules={rules.email}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              label={t.registration.emailStep.email}
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
              placeholder={t.registration.emailStep.emailPlaceholder}
              value={value ? value.toString() : undefined}
              onChangeText={onChange}
              onBlur={onBlur}
              error={error}
              returnKeyType={"send"}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
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

        <YStack flex={1} paddingBottom={20} justifyContent="flex-end">
          <PrimaryButton
            loading={loading}
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
          >
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
  label: {paddingRight: 12},
});
