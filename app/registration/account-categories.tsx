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
import {ScrollView, StyleSheet} from "react-native";
import {Input, YStack} from "tamagui";

export default function AccountCategories() {
  const router = useRouter();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const {dark} = useTheme();
  const theme = dark ? "dark" : "light";
  const t = false ? fr : en;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t.registration.accountCategories.title,
      headerTintColor: Colors[theme].text,
      headerBackButtonDisplayMode: "minimal",
    });
  });

  const onSubmit = () => {
    console.log("Form submitted");
    router.navigate("/(app)/home");
  };

  return (
    <ThemedView style={{paddingTop: headerHeight, ...styles.container}}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Input
          size={"$4"}
          placeholder={t.registration.accountCategories.search}
        />
        <YStack flex={1} paddingBottom={40} justifyContent="flex-end">
          <PrimaryButton onPress={onSubmit}>
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
});
