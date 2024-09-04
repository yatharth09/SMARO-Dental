import React, { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FormikValues, useFormik } from "formik";
import { api } from "@/api/api";
import useDispatchAction from "@/hooks/useDispatchAction";
import { setAuth } from "@/store/reducers/auth.slice";
import { showErrorToast, showSuccessToast } from "@/utils/notify";
import { setApiToken } from "@/storage/storage";
import { isValidString } from "@/utils/utils";
import { Link } from "react-router-dom";
import PreLoader from "@/components/PreLoader";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Layout from "./Layout";  // Adjust the import path as needed
import "./login.css";

const validationSchema = Yup.object().shape({
    mobile: Yup.string().required().length(10).label("Mobile"),
    password: Yup.string().label("Password").required(),
});

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatchAction();
    const { errors, values, handleSubmit, setFieldValue, isSubmitting } = useFormik({
        initialValues: {
            mobile: "",
            password: ""
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
                password: params.password,
            });
            const requestOptions = {
                method: "POST",
                headers: headers,
                body: data,
            };
            const response = await fetch(api.endpoints.auth.login, requestOptions);
            if (response.ok && response.status === 200) {
                const { statusCode, error, message, data } = await response.json();
                if (statusCode === 200) {
                    showSuccessToast(message);
                    if (isValidString(data.token)) {
                        setApiToken(data.token);
                    }

                    dispatch(setAuth(data));
                    navigate("/");
                } else {
                    showErrorToast(error);
                }
            } else {
                showErrorToast("Something went wrong, please try again");
            }
        } catch (e) {
            showErrorToast("Something went wrong, please try again");
        }
    };

    return (
        <>
        <PreLoader visible={isSubmitting} />
        <Layout>
            <div className="w-full">
                <div className="text-center">
                    <h1 className="text-[#212529] text-[2.5rem] font-extralight">Welcome Back :)</h1>
                    <p className="text-gray-500 text-base font-normal mt-4">Please login to your account</p>
                </div>
                <form onSubmit={handleSubmit}  className="mt-10 w-full p-10">
                    <div>
                        <Input
                            value={values.mobile}
                            name="mobile"
                            onChange={(e) => setFieldValue("mobile", e.target.value)}
                            label="Mobile No"
                            type="text"
                        />
                        <p className="text-red-500 text-xs font-medium pt-2">{String(errors?.mobile ?? "")}</p>
                    </div>
                    <div className="mt-4">
                        <CustomPassword
                            value={values.password}
                            name="password"
                            onChange={(e) => setFieldValue("password", e.target.value)}
                            label="Password"
                            type="password"
                        />
                        <p className="text-red-500 text-xs font-medium pt-2">{String(errors?.password ?? "")}</p>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                name="rememberme"
                                id="rememberme"
                                className="cursor-pointer"
                            />
                            <label className="text-gray-500 cursor-pointer text-base font-normal" htmlFor="rememberme">Remember me</label>
                        </div>
                        <Link to="/forgot-password">
                            <p className="text-gray-500 cursor-pointer text-base font-normal">Forgot Password?</p>
                        </Link>
                    </div>
                    <button type="submit" className="w-full bg-purple-700 rounded-md h-16 text-white text-base font-normal mt-10 capitalize">
                        Login
                    </button>
                </form>
            </div>
        </Layout>
        </>

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
        <div className="rounded-md px-3 flex flex-col justify-center border border-gray-300 bg-gray-50 w-full h-16">
            <p className="text-sm text-gray-500">{label}</p>
            <input value={value} name={name} onChange={onChange} className="text-black text-lg outline-none bg-gray-50" type={type} />
        </div>
    );
};

interface CustomPasswordInputProps {
    type?: React.HTMLInputTypeAttribute;
    label: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    name?: string;
    value?: string | number | readonly string[];
}

const CustomPassword: React.FC<CustomPasswordInputProps> = ({ type, label, onChange, name, value }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="rounded-md px-3 flex flex-col justify-center border border-gray-300 bg-gray-50 h-16">
            <p className="text-sm text-gray-500">{label}</p>
            <div className="w-full flex justify-between items-center h-6">
                <input value={value} name={name} onChange={onChange} className="text-black text-lg outline-none bg-gray-50" type={showPassword ? "text" : type} />
                {type === "password" && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeIcon className="w-5 h-5 text-black" /> : <EyeSlashIcon className="w-5 h-5 text-black" />}
                    </button>
                )}
            </div>
        </div>
    );
};
