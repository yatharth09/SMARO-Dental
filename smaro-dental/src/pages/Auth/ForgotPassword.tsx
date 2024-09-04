import React from "react";
import * as Yup from "yup";
import { FormikValues, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "@/utils/notify";
import { api } from "@/api/api";
import { filterDigits } from "@/utils/utils";
import Layout from "./Layout";  // Adjust the import path as needed
import "./login.css";

const validationSchema = Yup.object().shape({
    mobile: Yup.string().length(10).required().label("Mobile No"),
});

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const { errors, values, handleSubmit, setFieldValue } = useFormik({
        initialValues: {
            mobile: "",
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
                    showSuccessToast(data.message);
                    navigate("/verify", { state: { mobile: params.mobile } });
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
        <Layout>
            <div className="w-full">
                <div className="text-center">
                    <h1 className="text-black text-4xl font-bold mt-10">Forgot password</h1>
                    <p className="text-gray-500 text-base font-normal mt-4">Setup new password</p>
                </div>
                <div className="mt-10 w-full p-10">
                    <div>
                        <Input
                            value={values.mobile}
                            name="mobile"
                            onChange={(e) => setFieldValue("mobile", filterDigits(e.target.value))}
                            label="Mobile No"
                            type="text"
                        />
                        <p className="text-red-500 text-xs font-medium pt-2">{String(errors?.mobile ?? "")}</p>
                    </div>
                    <button onClick={() => handleSubmit()} type="submit" className="w-full bg-[#45197F] rounded-[4px] h-[3.75rem] text-white text-base font-normal !mt-20 !capitalize">
                        Next
                    </button>
                    <p onClick={() => navigate("/")} className="text-[#6C757D] text-center cursor-pointer mt-16 text-base font-normal">
                        Back to Login
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default ForgotPassword;


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
