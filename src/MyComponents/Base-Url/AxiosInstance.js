import axios from "axios";
const token = JSON.parse(localStorage.getItem("token"));

export const axiosIntance = axios.create({
  baseURL: "https://arcane-ecom-backend-v2.onrender.com/api/",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const generatePublicUrl = (fileName) => {
  return `https://arcane-ecom-backend-v2.onrender.com${fileName}`;
};
