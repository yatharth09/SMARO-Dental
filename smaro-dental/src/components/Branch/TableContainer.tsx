import classNames from "classnames";
import React from "react";

interface Props {
    children: React.ReactNode
    dashboard?: boolean
}

const TableContainer: React.FC<Props> = ({children, dashboard = false}) => {
    return (
        <div
             className={classNames("w-[calc(100%-62px)] h-[calc(100vh-15vh)] flex flex-col px-[2px] rounded-[12px]")}>
            <div className={classNames("w-full h-full  relative", dashboard && "h-[20px]")}>
                {children}
            </div>
        </div>
    );
}

export default TableContainer;
