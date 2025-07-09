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
    },
    {
      username: "",
      platform: "FACEBOOK",
      image_url: require("../../assets/images/facebook.png"),
    },
    {
      username: "",
      platform: "LINKEDIN",
      image_url: require("../../assets/images/linkedin.png"),
    },
    {
      username: "",
      platform: "WHATSAPP",
      image_url: require("../../assets/images/whatsapp.png"),
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
