import React from "react";
import SearchBar from "../components/Common/SearchBar";
import NavMenus from "../components/Common/NavMenus";


const Navbar: React.FC = () => {
    return (
        <div  className="h-[76px] sticky z-[1] top-0 w-full flex items-center justify-between px-8 bg-white">
            <SearchBar/>
            <NavMenus/>
        </div>
     );
}

export default Navbar;
