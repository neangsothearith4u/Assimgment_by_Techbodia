import axios from "axios";

export const get_all_country = async () => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/all`);
    return response;
  } catch (e: any) {
    return e.response;
  }
};
