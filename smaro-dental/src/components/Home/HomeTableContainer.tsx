import classNames from "classnames";
import React from "react";
import filterIcon from "@/assets/svg/filter.svg"
import searchIcon from "@/assets/svg/search.svg"

interface Props {
    children:React.ReactNode
    dashboard?:boolean
}

const HomeTableContainer: React.FC<Props> = ({children,dashboard=false}) => {
    return (
        <div style={{boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.10)"}}
             className={classNames(" bg-white flex flex-col px-[2px] rounded-[12px] ")}>
            <div className={classNames("w-full h-[68px] flex px-10 justify-between border-b border-[#DEE2E6]",dashboard && "h-[20px]")}>

            <img src={searchIcon} className="cursor-pointer" width={16} height={28} alt="" />
            <img src={filterIcon} className="cursor-pointer" width={16} height={28} alt="" />
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default HomeTableContainer;
