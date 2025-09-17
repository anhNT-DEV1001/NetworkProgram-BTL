import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import NotFound from "../../pages/errors/NotFound";

const AppRoutes = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                { index: true, element: <Home /> },
                { path: "about", element: <About /> },
            ],
        },
        { path: "*", element: <NotFound /> },
    ]);

    return routes;
};

export default AppRoutes;
