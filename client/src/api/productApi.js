import axiosClient from "./axiosClient";

const PREFIX = "/admin/products";

const productApi = {
  getAllProduct: () => {
    const url = `${PREFIX}`;
    return axiosClient.get(url);
  },
  getAllToping: () => {
    const url = `${PREFIX}/get-topping`;
    return axiosClient.get(url);
  },
  getAllCategory: () => {
    const url = `${PREFIX}/get-category`;
    return axiosClient.get(url);
  },

  getProductById: (id) => {
    const url = `${PREFIX}/${id}`;
    return axiosClient.get(url);
  },


  createProduct: (data) => {
    const url = `${PREFIX}`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateProductById: (id, data) => {
    const url = `${PREFIX}/update-product/${id}`;
    return axiosClient.patch(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },


  deleteProduct: (id) => {
    const url = `${PREFIX}/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
