import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useNavigation, useRouter} from "expo-router";
import {useLayoutEffect} from "react";
import {StyleSheet} from "react-native";

export default function IntroScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  });

  return (
    <ThemedView style={styles.container}>
      <PrimaryButton
        onPress={() => router.navigate("/registration/general-information")}
      >
        <ThemedText type="labelBold">Go to form</ThemedText>
      </PrimaryButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
