import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Colors} from "@/constants/Colors";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {useHeaderHeight} from "@react-navigation/elements";
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
  const t = true ? fr : en;
  const navigation = useNavigation();
  const theme = "dark";
  const inputRefs = useRef<Record<string, Input | null>>({});

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Your details",
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
      phone_hidden: true,
    },
  });

  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    router.back();
  };

  const fields = [
    {
      name: "username",
      label: t.registration.generalInformation.username + " *",
      placeholder: t.registration.generalInformation.username,
    },
    {
      name: "firstname",
      label: t.registration.generalInformation.firstname,
      placeholder: t.registration.generalInformation.firstname,
    },
    {
      name: "lastname",
      label: t.registration.generalInformation.lastname,
      placeholder: t.registration.generalInformation.lastname,
    },
    {
      name: "phone_number",
      label: t.registration.generalInformation.phoneNumber,
      placeholder: "+49 000 0000000",
    },
  ];

  return (
    <ThemedView style={{paddingTop: headerHeight, ...styles.container}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {fields.map((field, index) => (
          <YStack key={field.name}>
            <ThemedText style={styles.caption} type="caption">
              {field.label}
            </ThemedText>
            <Controller
              name={field.name as keyof FormData}
              control={control}
              rules={{
                required:
                  field.name === "username"
                    ? t.registration.generalInformation.username +
                      " " +
                      t.registration.generalInformation.isRequired
                    : false,
                pattern:
                  field.name === "phone_number"
                    ? {
                        value: /^\+?[0-9\s\-()]{7,15}$/,
                        message:
                          t.registration.generalInformation.phoneNumber +
                          " " +
                          t.registration.generalInformation.invalid,
                      }
                    : undefined,
              }}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <>
                  <Input
                    ref={(ref) => {
                      inputRefs.current[field.name] = ref;
                    }}
                    size="$4"
                    keyboardType={
                      field.name === "phone_number" ? "phone-pad" : "default"
                    }
                    placeholder={field.placeholder}
                    value={value ? value.toString() : undefined}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    borderColor={error ? "red" : undefined}
                    returnKeyType={index < fields.length - 1 ? "next" : "send"}
                    onSubmitEditing={() => {
                      const nextField = fields[index + 1];
                      if (nextField) {
                        inputRefs.current[nextField.name]?.focus();
                      } else {
                        handleSubmit(onSubmit);
                        // Keyboard.dismiss();
                      }
                    }}
                  />
                  {error && (
                    <ThemedText style={{color: "red"}} type="caption">
                      {error.message}
                    </ThemedText>
                  )}
                </>
              )}
            />
          </YStack>
        ))}

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
                checked={value}
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
              {t.registration.generalInformation.continue}
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
