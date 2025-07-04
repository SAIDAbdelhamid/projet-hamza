import ws from "@/api/axiosConfig";
import {RootState} from "@/store";
import {Redirect} from "expo-router";
import * as SecureStore from "expo-secure-store";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export default function Page() {
  const registration = useSelector((state: RootState) => state.registration);
  async function getToken() {
    const access_token = await SecureStore.getItemAsync("access_token");
    if (access_token)
      ws.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
  }
  useEffect(() => {
    getToken();
  }, []);

  return (
    <Redirect
      href={
        registration.step === "DONE" ? "/(app)/home" : "/registration/intro"
      }
    />
  );
}
