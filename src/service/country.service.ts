import axios from "axios";

export const get_all_country = async () => {
  // console.log("pageNumber ", pageNumber);
  try {
    // console.log("work");
    const response = await axios.get(`https://restcountries.com/v3.1/all`);
    // console.log("Response : ", response);
    return response;
  } catch (e: any) {
    // console.log("Error :", e.response);
    return e.response;
  }
};
