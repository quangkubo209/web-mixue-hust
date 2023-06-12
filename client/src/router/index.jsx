import { createBrowserRouter } from "react-router-dom";
import route from "../constants/route";
import Home from "../components//Home";
import DefaultLayout from "../components/DefaultLayout";
import Dashboard from "../pages/Dashboard";
import ProductManagement from "../pages/product/ProductManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: route.ADMINPAGE,
    element: <DefaultLayout />,
    children:[
      {
        path: route.DASHBOARD,
        element: <Dashboard/>
      },
      {
        path: route.PRODUCTMANAGEMENT,
        element: <ProductManagement />,
      },
    ]
  }, 

]);

export default router;
