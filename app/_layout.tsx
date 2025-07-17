import {persistor, store} from "@/store";
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
import {ActivityIndicator, StatusBar} from "react-native";
import "react-native-reanimated";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {createTamagui, TamaguiProvider, View} from "tamagui";

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  // const {dark} = useTheme();
  const theme = "dark";
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
    <TamaguiProvider config={configTamagui} defaultTheme={theme!}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
            <Slot />
            <StatusBar barStyle="light-content" />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </TamaguiProvider>
  );
}

function Loading() {
  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <ActivityIndicator />
    </View>
  );
}
