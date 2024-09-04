import React, { useEffect } from "react";
import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "@/utils/notify";
import { api } from "@/api/api";
import { isValidString } from "@/utils/utils";
import Layout from "./Layout";  // Adjust the import path as needed
import "./login.css";

const validationSchema = Yup.object().shape({
    mobile: Yup.string().length(10).label("Mobile").required(),
    otp: Yup.string().label("OTP").required(),
    password: Yup.string().label("Password").required(),
    confirm_password: Yup.string().label("Confirm Password").required()
});

export default function NewPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    const { errors, values, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            mobile: "",
            otp: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (params: FormikValues) => {
            await handleFormSubmit(params);
        }
    });

    const handleFormSubmit = async (params: FormikValues) => {
        try {
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const data = JSON.stringify({
                mobile: params.mobile,
                otp: params.otp,
                password: params.password,
                confirm_password: params.confirm_password,
            });
            const requestOptions = {
                method: "POST",
                headers: headers,
                body: data,
            };
            const response = await fetch(api.endpoints.auth.reset_password, requestOptions);
            if (response.ok && response.status === 200) {
                const { statusCode, error } = await response.json();
                if (statusCode === 200) {
                    showSuccessToast("Password changed successfully!");
                    setTimeout(() => {
                        navigate("/", { state: { mobile: params.mobile } });
                    }, 2000);
                } else {
                    if (statusCode === 412) {
                        navigate("/verify", { state: { mobile: params.mobile } });
                    }
                    showErrorToast(error);
                }
            } else {
                showErrorToast("Something went wrong,please try again");
            }
        } catch (e) {
            showErrorToast("Something went wrong,please try again");
        }
    };

    useEffect(() => {
        if (location.state.mobile) {
            void setFieldValue("mobile", location.state.mobile);
        }
        if (location.state.otp) {
            void setFieldValue("otp", location.state.otp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

    return (
        <Layout>
            <div className="w-full">
                <div className="text-center">
                    <h1 className="text-black text-4xl font-extralight mt-10">New Password</h1>
                    <p className="text-gray-500 text-base font-normal mt-4">Enter New password and confirm password</p>
                </div>
                <div className="mt-10 w-full p-10">
                    <div>
                        <Input
                            value={values.password}
                            name="password"
                            onChange={(e) => setFieldValue("password", e.target.value)}
                            label="Password"
                            type="password"
                        />
                        {isValidString(errors?.password) && <p className="text-red-500 text-xs font-medium pt-2">{String(errors?.password ?? "")}</p>}
                    </div>
                    <div className="mt-5">
                        <Input
                            value={values.confirm_password}
                            name="confirm_password"
                            onChange={(e) => setFieldValue("confirm_password", e.target.value)}
                            label="Confirm Password"
                            type="password"
                        />
                        {isValidString(errors?.confirm_password) && <p className="text-red-500 text-xs font-medium pt-2">{String(errors?.confirm_password ?? "")}</p>}
                    </div>
                    <button onClick={() => handleSubmit()} type="submit" className="w-full bg-[#45197F] rounded-[4px] h-[3.75rem] text-white text-base font-normal !mt-20 !capitalize">
                        Submit
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
