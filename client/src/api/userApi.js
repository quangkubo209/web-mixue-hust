import axiosClient from "./axiosClient";

const PREFIX = "/user";

const userApi = {
  getAllUsers: () => {
    const url = `${PREFIX}`;
    return axiosClient.get(url);
  },
  getUserById: (id) => {
    const url = `${PREFIX}/${id}`;
    return axiosClient.get(url);
  },
  deleteUserById: (id) => {
    const url = `${PREFIX}/${id}`;
    return axiosClient.delete(url);
  },

  updateUserById: (id, data) => {
    const url = `${PREFIX}/${id}`;
    return axiosClient.patch(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default userApi;
