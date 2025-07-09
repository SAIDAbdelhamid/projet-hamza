import {Stack} from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "default",
        headerTransparent: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen
        name="social-network"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="location-picker"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="categories"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
