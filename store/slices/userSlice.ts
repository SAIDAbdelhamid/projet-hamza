import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type UserState = {
  socials: {
    username?: string;
    platform?:
      | "FACEBOOK"
      | "INSTAGRAM"
      | "TWITTER"
      | "WECHAT"
      | "LINKEDIN"
      | "YOUTUBE"
      | "TIKTOK"
      | "SNAPCHAT"
      | "WHATSAPP"
      | "TELEGRAM";
    profile_url?: string;
    image_url?: string;
  }[];
};

const initialState: UserState = {
  socials: [
    {
      username: "",
      platform: "TWITTER",
      image_url: require("../../assets/images/twitter.png"),
      profile_url: "",
    },
    {
      username: "",
      platform: "FACEBOOK",
      image_url: require("../../assets/images/facebook.png"),
      profile_url: "",
    },
    {
      username: "",
      platform: "LINKEDIN",
      image_url: require("../../assets/images/linkedin.png"),
      profile_url: "",
    },
    {
      username: "",
      platform: "WHATSAPP",
      image_url: require("../../assets/images/whatsapp.png"),
      profile_url: "",
    },
    {
      username: "",
      platform: "INSTAGRAM",
      image_url: require("../../assets/images/instagram.png"),
      profile_url: "",
    },
    {
      username: "",
      platform: "WECHAT",
      image_url: require("../../assets/images/wechat.png"),
      profile_url: "",
    },
    {
      username: "",
      platform: "YOUTUBE",
      image_url: require("../../assets/images/youtube.png"),
      profile_url: "",
    },
    {
      username: "",
      platform: "TIKTOK",
      image_url: require("../../assets/images/tiktok.png"),
      profile_url: "",
    },
    {
      username: "",
      platform: "SNAPCHAT",
      image_url: require("../../assets/images/snap.png"),
      profile_url: "",
    },
    {
      username: "",
      platform: "TELEGRAM",
      image_url: require("../../assets/images/telegram.png"),
      profile_url: "",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.socials = action.payload.socials;
    },
    clearUser(state) {
      state.socials = initialState.socials;
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;
