import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import PlanetView from "./pages/PlanetView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "planet/:id", Component: PlanetView },
    ],
  },
]);
