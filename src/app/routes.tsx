import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { StudioPage } from "./pages/StudioPage";
import { OutputsPage } from "./pages/OutputsPage";
import { ProjectsPage } from "./pages/ProjectsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/studio",
    Component: StudioPage,
  },
  {
    path: "/outputs",
    Component: OutputsPage,
  },
  {
    path: "/projects",
    Component: ProjectsPage,
  },
]);
