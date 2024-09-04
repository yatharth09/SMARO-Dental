import React, {Fragment} from "react";
import {RouterProvider} from "react-router-dom";
import authRoutes from "./routes/auth-routes";
import useAuth from "./hooks/useAuth";
import {isValidString} from "./utils/utils";
import appRoutes from "./routes/app-routes";
import  {Toaster} from "react-hot-toast";
import useAuthStatusCheck from "./hooks/useAuthStatusCheck";


const App: React.FC = () => {
   const {token} = useAuth();
   useAuthStatusCheck();
    return (
        <Fragment>
          <Toaster/>
          <RouterProvider router={isValidString(token)? appRoutes: authRoutes}/>
         </Fragment>
    )
}

export default App;
