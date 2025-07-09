import {getUser} from "@/api/apis";
import PrimaryButton from "@/components/PrimaryButton";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import en from "@/constants/lang/en.json";
import fr from "@/constants/lang/fr.json";
import {clearRegistration} from "@/store/slices/registrationSlice";
import {clearUser} from "@/store/slices/userSlice";
import {useNavigation, useRouter} from "expo-router";
import * as SecureStore from "expo-secure-store";
import {useEffect, useLayoutEffect} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {useDispatch} from "react-redux";
import {YStack} from "tamagui";

export default function Home() {
  const dispatch = useDispatch();
  const t = false ? fr : en;
  const router = useRouter();
  const navigation = useNavigation();
  const token = SecureStore.getItem("access_token");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  });

  useEffect(() => {
    async function getUserInfo() {
      try {
        const user = await getUser();
        if (!user.seller) {
          router.navigate("/(app)/categories");
        } else {
          router.navigate("/(app)/location-picker");
        }
      } catch (e) {}
    }
    getUserInfo();
  }, [token]);

  const onPressLogout = () => {
    dispatch(clearRegistration());
    SecureStore.deleteItemAsync("access_token");
    router.navigate("/");
  };

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
          <PrimaryButton
            onLongPress={() => dispatch(clearUser())}
            onPress={() => router.navigate("/social-network")}
          >
            <ThemedText type="labelBold">Social Network</ThemedText>
          </PrimaryButton>
        </YStack>
        <YStack flex={1} paddingBottom={20} justifyContent="flex-end">
          <PrimaryButton onPress={onPressLogout}>
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
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
    paddingTop: 40,
  },
});
