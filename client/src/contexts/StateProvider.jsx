// import { createContext, useContext, useEffect, useState } from "react";

// const StateContext = createContext({
//     currentUser: {},
//     setCurrentUser: () => {},
// });

// export const StateProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState({});

//     useEffect(() => {
//         if (localStorage.getItem("TOKEN")) {
//             const fetch = async () => {
//                 try {
//                     const response = await userApi.getUserByToken();
//                     if (response.data.success === "success") {
//                         setCurrentUser(response.data.admin);
//                     }
//                 } catch (err) {
//                     console.log(err);
//                 }
//             };

//             fetch();
//         }
//     }, []);

//     return (
//         <StateContext.Provider
//             value={{
//                 currentUser,
//                 setCurrentUser,
//             }}
//         >
//             {children}
//         </StateContext.Provider>
//     );
// };

// export const userStateContext = () => useContext(StateContext);
