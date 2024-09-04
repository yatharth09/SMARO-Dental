import classNames from "classnames";
import React from "react";


interface Props {
    children:React.ReactNode
    dashboard?:boolean
}

const TableContainer: React.FC<Props> = ({children,dashboard=false}) => {
    return (
        <div className={classNames("!w-full bg-white flex flex-col px-[2px] rounded-[12px] ")}>
            <div className={classNames("w-full h-[68px] border-b border-[#DEE2E6]",dashboard && "h-[20px]")}>
            <div className="w-full">
                {children}
            </div>
            </div>
        </div>
    );
}

export default TableContainer;
