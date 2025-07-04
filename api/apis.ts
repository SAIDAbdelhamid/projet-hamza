import axios from "./axiosConfig";

export const postLogin = async ({username, password}: TRequestLogin) =>
  (await axios.post("/app-auth/login", {username, password}))
    .data as TResponseLogin;

export const postRegister = async ({
  username,
  email,
  password,
  password_confirm,
  firstname,
  lastname,
  phone_number,
  phone_hidden,
}: TRequestRegister) =>
  (
    await axios.post("/app-auth/register", {
      username,
      email: email.toLowerCase(),
      password,
      password_confirm,
      firstname,
      lastname,
      phone_number,
      phone_hidden,
    })
  ).data as TResponseLogin & TErrorRegister;

export const postSendOtp = async ({email}: {email: string}) =>
  (
    await axios.post("/app-auth/otp/verification/email", {
      email: email.toLowerCase(),
    })
  ).data as {
    success: boolean;
  };

export const postVerifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) =>
  (
    await axios.post("/app-auth/verification/email", {
      email: email.toLowerCase(),
      otp,
    })
  ).data as {
    success: boolean;
  };

export const getCategories = async () =>
  (await axios.get("/api/categories")).data as {
    data: TCategorie[];
    pagination: {page: number; take: number};
  };

export const patchUserType = async ({is_seller}: {is_seller: boolean}) =>
  (await axios.patch("/api/me/type", {is_seller})).data as {
    success: boolean;
  };

export const patchSellerCategories = async ({
  categories,
}: {
  categories: string[];
}) =>
  (await axios.patch("/api/me/seller-categories", {categories})).data as {
    success: boolean;
  };

export const patchInterestedCategories = async ({
  categories,
}: {
  categories: string[];
}) =>
  (await axios.patch("/api/me/interested-categories", {categories})).data as {
    success: boolean;
  };

export const patchSellerSocials = async ({socials}: {socials: TSocial[]}) =>
  (await axios.patch("/api/me/seller-socials", {socials})).data as {
    success: boolean;
  };

export const patchLocation = async (data: TRequestLocation) =>
  (await axios.patch("/api/me/location", data)).data as {
    success: boolean;
  };

type TRequestLogin = {
  username: string;
  password: string;
};
type TResponseLogin = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: "Bearer" | string;
  scope: string;
  session_state: string;
};
type TRequestRegister = {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  phone_hidden: boolean;
};
type TErrorRegister = {
  username: string[];
  email: string[];
  password_confirm: string[];
  password: string[];
};
export type TCategorie = {
  id: string;
  name: string;
  slug: string;
  name_ar: string;
  name_fr: string;
  name_zn: string;
  dark_icon_url: string;
  light_icon_url: string;
  created_at: string;
  updated_at: string;
};
type TSocial = {
  username: string;
  platform:
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
  profile_url: string;
  image_url: string;
};
type TRequestLocation = {
  id_api: string;
  lat: number;
  lng: number;
  ip: string;
  country: TCountry;
  subdivision: TSubdivision;
  city: TCity;
};
type TCountry = {
  name: string;
  code: string;
};
type TSubdivision = {
  name: string;
  code: string;
  type: string;
};
type TCity = {
  name: string;
  code: string;
  type: string;
};
