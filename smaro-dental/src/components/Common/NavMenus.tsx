import React,{Fragment}from "react";
//import notificationIcon from "@/../src/assets/svg/iconly-bulk-notification.svg"
//import messageIcon from "@/../src/assets/svg/iconly-bulk-message.svg"
import profilePhoto from "../../../src/assets/images/avatar.jpg"
import classNames from "classnames";
import useDispatchAction from "@/hooks/useDispatchAction";
import {logOut} from "@/store/reducers/auth.slice";
import {useNavigate} from "react-router-dom";
import { Menu, Transition } from "@headlessui/react"
const userNavigation = [
    { name: "Profile", route: "profile" },
    { name: "Sign out", route: "logout" },
  ]

const NavMenus: React.FC = () => {
    const dispatch = useDispatchAction();
    const navigate = useNavigate();
    const onPressMenu = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,route:string)=>{
        e.preventDefault();
        if(route==="logout")
        {
            dispatch(logOut())
        }
        else {
            navigate(`/${route}`);
        }

    }
    return (<div className="flex items-center gap-x-4">
     {/*   <img src={notificationIcon} alt="notification icon"/>
        <img src={messageIcon} alt="message icon"/>*/}
        <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={profilePhoto} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a href="#" onClick={(e)=>onPressMenu(e,item.route)} className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
    </div>);
}

export default NavMenus;
