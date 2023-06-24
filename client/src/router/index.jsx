import { createBrowserRouter,Navigate } from "react-router-dom";
import route from "../constants/route";
import Home from "../components//Home";
import DefaultLayout from "../components/DefaultLayout";
import Dashboard from "../pages/dashboard";
import ProductManagement from "../pages/product/ProductManagement";
import Analytics from "../pages/analytics";
import OrderManagementPage from "../pages/order/OrderManagement";
const router = createBrowserRouter([
  {
    path: route.HOME,
    element: <Home />,
  },
  {
    path: route.ADMINPAGE,
    element: <DefaultLayout />,
    children: [
      {
        path: route.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: route.PRODUCTMANAGEMENT,
        element: <ProductManagement />,
      },
      {
        path: route.ANALYTICS,
        element: <Analytics />,
      },
      {
        path: route.ORDER,
        element: <OrderManagementPage/>
      }
    ],
  },
]);

export default router;
