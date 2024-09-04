import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { api } from "@/api/api";
import { notify, showErrorToast, showSuccessToast } from "@/utils/notify";
import { isValidString } from "@/utils/utils";
import Layout from "./Layout";  // Adjust the import path as needed
import "./login.css";

const validationSchema = Yup.object().shape({
    mobile: Yup.string().required().length(10).label("Mobile No"),
    otp: Yup.string().required().label("OTP"),
});

export default function Verify() {
    const navigate = useNavigate();
    const location = useLocation();
    const [seconds, setSeconds] = useState(30);

    const { errors, values, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            mobile: "",
            otp: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (params: FormikValues) => {
            await handleFormSubmit(params);
        },
    });

    const handleFormSubmit = async (params: FormikValues) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const data = JSON.stringify({
            mobile: params.mobile,
            otp: params.otp,
        });
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: data,
        };
        const response = await fetch(api.endpoints.auth.verify_otp, requestOptions);
        if (response.ok && response.status === 200) {
            const { statusCode, message }: { statusCode: number; message: string } = await response.json();
            if (statusCode === 200) {
                navigate("/new-password", { state: params });
            } else {
                notify(message);
            }
        } else {
            notify("Something went wrong,please try again");
        }
    };

    const sendOTP = async () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const data = JSON.stringify({
            mobile: values.mobile,
        });
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: data,
        };
        const response = await fetch(api.endpoints.auth.forgot_password, requestOptions);
        if (response.ok && response.status === 200) {
            const { statusCode, data, error } = await response.json();
            if (statusCode === 200) {
                setSeconds(30);
                showSuccessToast(data.message + "\n" + `Your otp is ${data.otp}`);
            } else {
                showErrorToast(error);
            }
        } else {
            showErrorToast("Something went wrong,please try again");
        }
    };

    useEffect(() => {
        if (location.state.mobile) {
            void setFieldValue("mobile", location.state.mobile);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    return (
        <Layout>
            <div className="w-full">
                <div className="text-center">
                    <h1 className="text-black text-4xl font-extralight mt-10">Verify</h1>
                    <p className="text-gray-500 text-base font-normal mt-4">Enter OTP received on registered email ID</p>
                </div>
                <div className="mt-10 w-full p-10">
                    <div>
                        <Input
                            value={values.otp}
                            name="otp"
                            onChange={(e) => setFieldValue("otp", e.target.value)}
                            label="OTP"
                            type="number"
                        />
                        <p className="text-red-500 text-xs font-medium pt-2">{String(errors?.otp ?? "")}</p>
                        {isValidString(errors?.mobile) && <p className="text-red-500 text-xs font-medium pt-2">{String(errors?.mobile)}</p>}
                    </div>
                    {seconds > 0 ? (
                        <div className="w-full text-right cursor-pointer">
                            <p className="text-gray-600 font-normal text-base">Resend in {seconds} Sec</p>
                        </div>
                    ) : (
                        <div className="w-full text-right cursor-pointer">
                            <p onClick={sendOTP} className="text-green-600 font-normal text-base">Send Again</p>
                        </div>
                    )}
                    <button onClick={() => handleSubmit()} type="submit" className="w-full bg-[#45197F] rounded-[4px] h-[3.75rem] text-white text-base font-normal !mt-20 !capitalize">
                        Verify OTP
                    </button>
                </div>
            </div>
        </Layout>
    );
}



interface InputProps {
    type?: React.HTMLInputTypeAttribute;
    label: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    name?: string;
    value?: string | number | readonly string[];
}

const Input: React.FC<InputProps> = ({ type, label, onChange, name, value }) => {
    return (
        <div className="rounded-md px-3 flex flex-col justify-center border border-gray-300 bg-gray-50 w-full h-[3.75rem]">
            <p className="text-sm text-gray-500">{label}</p>
            <input value={value} name={name} onChange={onChange} className="text-black text-lg outline-none !bg-gray-50" type={type} />
        </div>
    );
};
