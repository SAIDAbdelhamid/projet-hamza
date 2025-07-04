import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type RegistrationState = {
  step:
    | "INTRO"
    | "EMAIL_STEP"
    | "EMAIL_OTP"
    | "CREATE_PASSWORD"
    | "GENERAL_INFORMATION"
    | "ACCOUNT_TYPE"
    | "ACCOUNT_CATEGORIES"
    | "DONE";
  email: string;
  email_hidden: boolean;
  password: string;
  password_confirm: string;
  otp: string;
  firstname: string;
  lastname: string;
  username: string;
  phone_number: string;
  phone_hidden: boolean;
  is_seller: boolean;
  categories: string[];
};

const initialState: RegistrationState = {
  step: "INTRO",
  email: "",
  email_hidden: false,
  password: "",
  password_confirm: "",
  otp: "",
  firstname: "",
  lastname: "",
  username: "",
  phone_number: "",
  phone_hidden: false,
  is_seller: false,
  categories: [],
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setRegistration(state, action: PayloadAction<RegistrationState>) {
      state.step = action.payload.step;
      state.email = action.payload.email;
      state.email_hidden = action.payload.email_hidden;
      state.password = action.payload.password;
      state.password_confirm = action.payload.password_confirm;
      state.otp = action.payload.otp;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.username = action.payload.username;
      state.phone_number = action.payload.phone_number;
      state.phone_hidden = action.payload.phone_hidden;
      state.is_seller = action.payload.phone_hidden;
      state.categories = action.payload.categories;
    },
    clearRegistration(state) {
      state.step = "INTRO";
      state.email = "";
      state.email_hidden = false;
      state.password = "";
      state.password_confirm = "";
      state.otp = "";
      state.firstname = "";
      state.lastname = "";
      state.username = "";
      state.phone_number = "";
      state.phone_hidden = false;
      state.is_seller = false;
      state.categories = [];
    },
  },
});

export const {setRegistration, clearRegistration} = registrationSlice.actions;
export default registrationSlice.reducer;
