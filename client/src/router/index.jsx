import { createBrowserRouter } from "react-router-dom";
import route from "../constants/route";
import Home from "../pages/home/Home";
import DefaultLayout from "../components/DefaultLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: route.HOME,
                element: <Home />,
            },
        ],
    },
    // {
    //     path: "/",
    //     element: <Guest />,
    //     children: [
    //         {
    //             path: route.SIGNIN,
    //             element: <Signin />,
    //         },
    //         {
    //             path: route.SIGNUP,
    //             element: <Signup />,
    //         },
    //     ],
    // },
]);

export default router;
