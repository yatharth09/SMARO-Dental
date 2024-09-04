import React from "react";
import classNames from "classnames";
import { FunctionComponent } from "react";

interface LabelContainerProps {
    label:string;
    children:React.ReactNode
    bold?:boolean
    style?:React.CSSProperties
}

const LabelHWrap: FunctionComponent<LabelContainerProps> = ({label,children,bold,style}) => {
    return (
        <div className="flex flex-row flex-wrap">
            <div className="w-[35%]">
                <h3 style={style} className={classNames("text-sm font-normal min-w-max text-black capitalize",bold && "font-bold")}>{label}</h3>
            </div>
            <div className="w-[65%] p-1 capitalize text-sm text-wrap">
                {children}
            </div>
        </div>
    );
}


export default LabelHWrap;
