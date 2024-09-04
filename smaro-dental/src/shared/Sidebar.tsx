import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import useDispatchAction from "../hooks/useDispatchAction";


import leftArrow from "../assets/svg/leftArrow.svg";
import {logOut} from "@/store/reducers/auth.slice";
import classNames from "classnames";
import {setCollapse} from "@/store/reducers/settings.slice";
import useSettings from "../hooks/useSettings";


import { IoGridOutline } from "react-icons/io5";
import { FaCodeBranch,FaUsersCog} from "react-icons/fa";
import { FaUserDoctor,FaUsers } from "react-icons/fa6";
import { LuClipboardList } from "react-icons/lu";
import { TiMessage } from "react-icons/ti";

import Logo from "../assets/images/logo-preview.png";
import LogoSmall from "../assets/images/logo-small.png";


const SidebarItem = ({item, onClick, collapse}: {
    item:{
         icon: React.ReactNode;
         route:string;
         label:string;
         visible:boolean;
    }

    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    collapse: boolean
}) => {
    const dispatch = useDispatchAction();
    const {icon,label,route}= item;
    const {pathname} = useLocation();
    const navigate = useNavigate();
       const goToMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,_route:string)=>{
           onClick?.(e);
           if(_route==="logout")
           {
               dispatch(logOut())
               return;
           }
           navigate(_route);
    }
    return (
         <div
            onClick={(e) => goToMenu(e,route)}
            className={classNames(
                "flex items-center gap-x-[10px] my-2 cursor-pointer  text-[#DEE2E6] hover:text-white hover:shadow-[0px 4px 10px 0px rgba(0, 0, 0, 0.12)]  py-2 rounded-[4px] hover:bg-radon-selection-color w-[14.563rem] pl-[1.5rem]",
                pathname === route&&
                "bg-radon-selection-color", collapse && "rounded-full py-0  pr-0  flex !justify-center !items-center ml-2 pl-1 !p-4 !w-12 !h-12"
            )}
        >
            {icon}
            {!collapse && <h1 className="text-[13px] font-bold uppercase leading-[20px]">{label}</h1>}
        </div>
    );
};

const menus = [
    {
        icon: <IoGridOutline className="fill-white" size={15}/>,
        label: "Home",
        route:"/",
        visible:true,
    },
    {
        icon: <FaUsers className="fill-white" size={15}/>,
        label: "Orders",
        route:"/orders",
        visible:false,
    },
    {
        icon:<FaCodeBranch className="fill-white" size={15}/>,
        label:"Patient Reports",
        route:"/patient-reports",
        visible:true

    },
    {
        icon: <FaUsers className="fill-white" size={15}/>,
        label: "Patients",
        route:"/patients",
         visible:false,
    },
    {
        icon: <FaUserDoctor className="fill-white" size={15}/>,
        label: "Wallet",
        route:"/wallet",
         visible:false,
    },
    {
        icon: <LuClipboardList className="fill-white" size={15}/>,
        label: "Template",
        route:"/template",
        visible:true,
    },
    {
        icon: <TiMessage className="fill-white" size={20}/>,
        label: "Tickets",
        route:"/tickets",
        visible:true,
    },
     {
        icon: <FaUsersCog className="fill-white" size={15}/>,
        label: "Profile",
         route:"/profile",
        visible:true,
    },
];

const Sidebar = () => {
    const {sidebar} = useSettings()

    const dispatch = useDispatchAction();
    const smallLogoStyle = {width:"40px",height:"40px",backgroundColor:"white",borderRadius:"10px"};
    const logoStyle = {width:"90px",height:"45px",backgroundColor:"white",borderRadius:"10px"};
    return (
        <div
            className={classNames("bg-[#45197F] h-screen w-64 flex flex-col fixed top-0 left-0 z-[2]  justify-between pb-10 ", sidebar.collapse && "!w-24")}>
            <div>
                <div
                    className="h-[4.875rem] border-b border-radon-blue-800 flex items-center gap-x-2 relative pl-8 ">
                    {!sidebar.collapse ? <img src={Logo} style={logoStyle} alt="My Radon Logo"/>: <img src={LogoSmall} style={smallLogoStyle} alt="My Radon Logo"/>}
                    <div onClick={() => dispatch(setCollapse())}
                         className="bg-radon-blue-500 flex cursor-pointer items-center justify-center p-[6px] rounded-full absolute -right-2">
                        <img src={leftArrow} width={18} height={18} alt="MY Radon logo"
                             className={classNames(sidebar.collapse && "rotate-180")}/>
                    </div>
                </div>
                <div className="mx-3 overflow-hidden mt-2">
                    {menus.filter(item=>item.visible).map((item, index) => {
                        return <SidebarItem collapse={sidebar.collapse} key={index} item={item}/>;
                    })}
                </div>
            </div>
            {/* <div className="ml-3">
                <SidebarItem
                    collapse={sidebar.collapse}
                    onClick={() => dispatch(logOut())}
                    item={{
                        icon:<FiLogOut className="fill-white" size={15}/>,
                        label:"Logout",
                        route:"logout",
                        visible:true,
                    }}

                />
            </div> */}
        </div>
    );
};

export default Sidebar;
