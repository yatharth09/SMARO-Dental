import {createBrowserRouter} from "react-router-dom";
import Canvas from "@/pages/Canvas";




const appRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Canvas/>,
    }

]);

export default appRoutes;
