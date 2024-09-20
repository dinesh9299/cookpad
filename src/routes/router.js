import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Details from "../components/Details";
import MealList from "../components/MealList";
import Searchpage from "../components/Searchpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "details/:id",
        element: <Details />,
      },
      {
        path: "meals/:name",
        element: <MealList />,
      },
      {
        path: "search",
        element: <Searchpage />,
      },
    ],
  },
]);

export default router;
