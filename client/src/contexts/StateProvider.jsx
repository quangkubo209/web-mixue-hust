import { createContext, useContext, useEffect, useState } from "react";
import authApi from "../api/authApi";

const StateContext = createContext({
    currentUser: {},
    setCurrentUser: () => {},
});

export const StateProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        //check whether have token or not.
        if (localStorage.getItem("TOKEN")) {
            const fetch = async () => {
                try {
                    const response = await authApi.getUserByToken();
                    console.log("response data : ", response.data.admin);
                    if (response.data.success === "success") {
                        setCurrentUser(response.data.admin);
                    }
                } catch (err) {
                    console.log(err);
                }
            };

            fetch();
        }
    }, []);

    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const userStateContext = () => useContext(StateContext);
