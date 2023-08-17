import axiosClient from "./axiosClient";

const PREFIX = "/user";

const authApi = {
    signin: (data) => {
        const url = `${PREFIX}/login`;
        return axiosClient.post(url, data);
    },
    signout: () => {
        const url = `${PREFIX}/signout`;
        return axiosClient.post(url);
    },
    changePassword: (data) => {
        const url = `${PREFIX}/change-password`;
        return axiosClient.post(url, data);
    }, 
    createStaff: (data) => {
        const url = `${PREFIX}`;
        return axiosClient.post(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
    getUserById: (id) => {
        const url = `${PREFIX}/${id}`;
        return axiosClient.get(url);
    },
    getAllUser: () => {
        const url = `${PREFIX}`;
        return axiosClient.get(url);
    },
    updateUserById: (id, data) => {
        const url = `${PREFIX}/update-product/${id}`;
        return axiosClient.patch(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      },
    deleteUser: (id) => {
        const url = `${PREFIX}/${id}`;
        return axiosClient.delete(url);
      },
    getUserByToken: () => {
        const url = `${PREFIX}/token`;
        return axiosClient.get(url);
    },
};

export default authApi;
