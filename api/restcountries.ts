import axios from "axios";

export const getCountriesCities = async () =>
  (await axios.get("https://countriesnow.space/api/v0.1/countries")).data as {
    data: TCountry[];
    msg: string;
    error: boolean;
  };

export type TCountry = {
  country: string;
  cities: string[];
};
