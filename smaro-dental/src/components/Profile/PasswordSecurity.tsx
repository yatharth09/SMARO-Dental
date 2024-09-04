import React, {useState} from "react";
import * as Yup from "yup";
import {FormikValues, useFormik} from "formik";
import LabelPasswordInput from "../Common/LabelPasswordInput";
import {InputEvent} from "@/types";
import {notify} from "@/utils/notify";
import {api} from "@/api/api";
import useAuth from "@/hooks/useAuth";
import Spinner from "../Common/Spinner";


const validationSchema = Yup.object().shape({
    password: Yup.string().required().label("Password"),
    new_password: Yup.string().required().label("New Password"),
    confirm_password : Yup.string().required().label("Confirm Password")
})
const PasswordSecurity:React.FC = () => {
    const {user} = useAuth();
    const [isLoading,setIsLoading] = useState(false);
    const {values,errors,touched,setFieldValue,handleSubmit} = useFormik({
        initialValues: {
           password: "",
           new_password: "",
           confirm_password:""
        },
        onSubmit: async (params)=>{
            await onFormSubmit(params)
        },
        validationSchema
    });
    const onFormSubmit = async (params:FormikValues)=>{
         try {
            setIsLoading(true);
            const headers = {
                "Content-Type": "application/json",
            }
            params = {
                ...params,
                old_password: params.password,
                id: user?.id,
            }

            const {status: apiStatus, data: apiData} = await api.post(api.endpoints.profile.change_password, JSON.stringify(params), headers);
            if (apiStatus === 200) {
                setIsLoading(false);
                const {statusCode,error, message} = apiData;
                if (statusCode === 200) {
                 notify(message)
                } else {
                    notify(error);
                }
            }
        } catch (e) {
            setIsLoading(false);
            notify("Something went wrong,please try in sometime");
        }
    }
  return (
    <div className="w-full pr-16">
        <div className=" flex flex-col gap-y-4">
               <LabelPasswordInput
                   width={400}
                   label={"Old Password"}
                   type="password"
                   value={values.password}
                   onChange={(e: InputEvent)=>setFieldValue("password",e.target.value)}
                   touched={touched.password}
                   errorText={errors.password}
               />
                <LabelPasswordInput
                   width={400}
                   label={"New Password"}
                   type="password"
                   value={values.new_password}
                   onChange={(e: InputEvent)=>setFieldValue("new_password",e.target.value)}
                   touched={touched.new_password}
                   errorText={errors.new_password}
               />
                <LabelPasswordInput
                   width={400}
                   label={"Confirm Password"}
                   type="password"
                   value={values.confirm_password}
                   onChange={(e: InputEvent)=>setFieldValue("confirm_password",e.target.value)}
                   touched={touched.confirm_password}
                   errorText={errors.confirm_password}
               />
        </div>
       <button type="submit" onClick={()=>handleSubmit()}  className="w-[400px] bg-[#0D6EFD] rounded-[4px] h-[3rem] text-white text-base  font-normal !mt-5 !capitalize">
           { isLoading ? <Spinner/> : "Submit"}
       </button>
    </div>
  )
}
export default PasswordSecurity;
