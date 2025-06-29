import config from "@/utils/tamagui-config";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {Slot} from "expo-router";
import {KeyboardAvoidingView, Platform, StatusBar} from "react-native";
import "react-native-reanimated";
import {createTamagui, TamaguiProvider} from "tamagui";

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const colorScheme = "dark";
  const [loaded] = useFonts({
    Inter_900Black,
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_500Medium,
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const configTamagui = createTamagui(config);
  return (
    <TamaguiProvider config={configTamagui} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{flex: 1}}
        >
          <Slot />
          <StatusBar barStyle="light-content" />
        </KeyboardAvoidingView>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
