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
  const redirectTo = {
    INTRO: "/registration/intro",
    EMAIL_STEP: "/registration/email-step",
    EMAIL_OTP: "/registration/email-otp",
    CREATE_PASSWORD: "/registration/create-password",
    GENERAL_INFORMATION: "/registration/general-information",
    ACCOUNT_TYPE: "/registration/account-type",
    ACCOUNT_CATEGORIES: "/registration/account-categories",
    DONE: "/(app)/home",
  } as const;
  useEffect(() => {
    getToken();
  }, []);

  return (
    // <Redirect
    //   href={
    //     registration.step
    //       ? redirectTo[registration.step]
    //       : "/registration/intro"
    //   }
    // />
    <Redirect href={"/login"} />
  );
}
