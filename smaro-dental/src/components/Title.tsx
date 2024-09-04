import * as React from "react";

interface TitleProps {
    children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
    return (
        <h6  className="text-blue-500">
            {props.children}
        </h6>
    );
}
