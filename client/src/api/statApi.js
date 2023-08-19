import axiosClient from "./axiosClient";
import axios from "axios";
const PREFIX = "/admin/stat";

const statApi = {
  countSome: () => {
    const url = `${PREFIX}/count`;
    console.log("url", url);
    return axiosClient.get(url);
  },
};

export default statApi;
