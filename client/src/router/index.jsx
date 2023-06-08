import { createBrowserRouter } from "react-router-dom";
import route from "../constants/route";
import Home from "../components//Home";
import CrudProduct from "../components/CrudProduct";
import VerticalMenuBar from "../components/MenuBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: route.CRUDPRODUCT,
    element: <CrudProduct />,
  },
  {
    path: route.VERTICALMENUBAR,
    element: <VerticalMenuBar />,
  }
]);

export default router;
