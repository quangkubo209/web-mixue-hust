import axiosClient from "./axiosClient";

const PREFIX = "/admin";

const authApi = {
    signin: (data) => {
        const url = `${PREFIX}/login`;
        return axiosClient.post(url, data);
    },
    signout: () => {
        const url = `${PREFIX}/logout`;
        return axiosClient.post(url);
    },
    changePassword: (data) => {
        const url = `${PREFIX}/change-password`;
        return axiosClient.post(url, data);
    }
};

export default authApi;
