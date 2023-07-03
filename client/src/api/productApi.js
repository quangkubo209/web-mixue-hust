import axiosClient from "./axiosClient";

const PREFIX = "/admin/products";

const productApi = {
  getAllProduct: () => {
    const url = `${PREFIX}`;
    return axiosClient.get(url);
  },

  getProductById: (id) => {
    const url = `${PREFIX}/${id}`;
    return axiosClient.get(url);
  },

  // createProduct: (data) => {
  //   let formData = new FormData();
  //   for (let key in data) {
  //     if (key === "variationss") {
  //       formData.append(key, JSON.stringify(data[key]));
  //     } else formData.append(key, data[key]);
  //   }
  //   // for (var pair of formData.entries()) {
  //   //   console.log(pair[0] + ", " + pair[1]);
  //   // }
  //   const url = `${PREFIX}`;
  //   return axiosClient.post(url, formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // },

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

  // updateMainImage: (data) => {
  //   const url = `${PREFIX}/update-mainImage`;
  //   return axiosClient.patch(url, data, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // },

  deleteProduct: (id) => {
    const url = `${PREFIX}/${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
