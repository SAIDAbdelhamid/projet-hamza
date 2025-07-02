import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {YStack} from "tamagui";

export default function Home() {
  const t = false ? fr : en;
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  });

  return (
    <ThemedView
      source={require("../../assets/images/background1.png")}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <YStack paddingTop={40}>
          <PrimaryButton onPress={() => router.navigate("/location-picker")}>
            <ThemedText type="labelBold">Where are you?</ThemedText>
          </PrimaryButton>
        </YStack>
        <YStack paddingTop={40}>
          <PrimaryButton onPress={() => router.navigate("/social-network")}>
            <ThemedText type="labelBold">Social Network</ThemedText>
          </PrimaryButton>
        </YStack>
        <YStack flex={1} paddingBottom={40} justifyContent="flex-end">
          <PrimaryButton onPress={() => router.navigate("/")}>
            <ThemedText type="labelBold">Logout</ThemedText>
          </PrimaryButton>
        </YStack>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: "100%",
    height: "45%",
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
    paddingTop: 40,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingBottom: 60,
    paddingTop: 0,
    justifyContent: "space-between",
  },
  titleContainer: {paddingLeft: 32, paddingRight: 32},
  timelineContainer: {alignItems: "flex-start"},
  title: {textAlign: "center", paddingBottom: 12},
  textAlign: {textAlign: "center"},
});
