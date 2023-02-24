import axios from "axios";
const token = JSON.parse(localStorage.getItem("token"));

export const axiosIntance = axios.create({
  baseURL: "http://localhost:3026/api/",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export const generatePublicUrl = (fileName) => {
  return `http://localhost:3026${fileName}`;
};
