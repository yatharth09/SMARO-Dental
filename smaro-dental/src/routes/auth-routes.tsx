import {createBrowserRouter} from "react-router-dom";
import Login from "../pages/Auth/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Verify from "../pages/Auth/Verify";
import NewPassword from "../pages/Auth/NewPassword";

const authRoutes = createBrowserRouter([

    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword/>,
    },
    {
        path: "/verify",
        element: <Verify/>
    },
    {
        path: "/new-password",
        element: <NewPassword/>
    },
       {
        path: "*",
        element: <Login/>
    },
]);

export default authRoutes;
