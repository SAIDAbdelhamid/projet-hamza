import {Stack} from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={({route}) => ({
        //@ts-ignore
        animation: route.params?.animation ?? "default",
        headerBackButtonDisplayMode: "default",
        headerTransparent: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "transparent",
        },
      })}
    />
  );
}
