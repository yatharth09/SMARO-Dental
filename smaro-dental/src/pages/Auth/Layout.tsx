import React from "react";
import smaro from "@/assets/images/smaro.png";
import BgLogo from "@/assets/images/smaroBackground.png";
import classNames from "classnames";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className={classNames("w-full md:w-3/5 flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat relative")} style={styles.bgImage}>
                <span className="hidden md:flex absolute top-20 flex-col items-center justify-center text-center px-4 md:px-0">
                    <div>
                        <span className="title text-2xl md:text-4xl font-bold">Artificial Intelligence </span>
                        <span className="helper text-2xl md:text-4xl block">
                            Driving
                            <br />
                            Results For The Medical Industry
                        </span>
                    </div>
                    <img src={smaro} alt="smaro logo" className="max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl" />
                </span>
            </div>
            <div className="w-full md:w-2/5 flex items-center justify-center px-5 md:px-10 py-10">
                {children}
            </div>
        </div>
    );
};

const styles = {
    bgImage: {
        backgroundImage: `url(${BgLogo})`,
    }
};

export default Layout;
