import axiosClient from "./axiosClient";

const PREFIX = "/admin/order";

const orderApi = {
    getAllOrders: () => {
    const url = `${PREFIX}`;
    return axiosClient.get(url);
  },

};

export default orderApi;
