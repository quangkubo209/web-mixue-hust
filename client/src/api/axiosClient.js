import axios from "axios";


// config api : 
// -- check whether refresh token has expired or not??
// -- add token to header.
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_REACT_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("TOKEN")}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    // async (error) => {
    //     const originalConfig = error.config;
    //     if (
    //         originalConfig.url !== "admin/login" &&
    //         originalConfig.url !== "admin/logout" &&
    //         error.response
    //     ) {
    //         if (error.response.status === 401 && !originalConfig._retry) {
    //             originalConfig._retry = true;

    //             const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    //             try {
    //                 console.log("Send refresh token");
    //                 const response = await axiosClient.post(
    //                     "/admin/refresh-token",
    //                     {
    //                         refreshToken,
    //                     }
    //                 );
    //                 localStorage.setItem(
    //                     "TOKEN",
    //                     response.data.tokens.accessToken
    //                 );

    //                 localStorage.setItem(
    //                     "REFRESH_TOKEN",
    //                     response.data.tokens.refreshToken
    //                 );
    //                 console.log("Receive new refresh token");

    //                 return axiosClient(originalConfig);
    //             } catch (err) {
    //                 localStorage.removeItem("TOKEN");
    //                 localStorage.removeItem("REFRESH_TOKEN");
    //                 throw err;
    //             }
    //         }
    //     } else {
    //         throw error;
    //     }

    //     // if (error.response && error.response.status === 401) {
    //     //     localStorage.removeItem("TOKEN");
    //     //     window.location.reload();
    //     //     return error;
    //     // }

    //     throw error;
    // }
);

export default axiosClient;