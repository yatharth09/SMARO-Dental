import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import useAuth from "@/hooks/useAuth";
import {humanTimeDiff} from "@/utils/utils";
import Spinner from "../Common/Spinner";
import {FormikValues, useFormik} from "formik";
import {notify} from "@/utils/notify";
import {api} from "@/api/api";
import InputWithLabel from "../Common/InputWithLabel";
import {InputEvent} from "@/types";

const validationSchema = Yup.object().shape({
    id: Yup.number().required().label("Id"),
    updated_by: Yup.number().required().label("Current User"),
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    mobile: Yup.string().required().length(10).label("Mobile"),
})

const EditProfile:React.FC = () => {
    const {user} = useAuth();
     const [isLoading,setIsLoading] = useState(false);
    const {values,errors,touched,setFieldValue,handleSubmit} = useFormik({
        initialValues: {
            id:0,
            name: "",
            email: "",
            mobile: "",
            updated_by:0,
        },
        onSubmit: async (params:FormikValues)=>{
            await onFormSubmit(params)
        },
        validationSchema:validationSchema,
    });

    const onChangeInputValue = (key:string,e:InputEvent)=>{
      void  setFieldValue(key,e.target.value);
    }

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

            const {status: apiStatus, data: apiData} = await api.post(api.endpoints.profile.update_profile, JSON.stringify(params), headers);
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

    useEffect(() => {
        if(user)
        {
            void  setFieldValue("id",user?.id);
            void  setFieldValue("name",user?.name);
            void  setFieldValue("email",user?.email);
            void  setFieldValue("mobile",user?.mobile);
            void  setFieldValue("updated_by",user?.id);
        }
    }, [setFieldValue, user]);

  return (
    <div className="w-full pr-16">
        <div className="flex justify-between w-full">
            <h1 className="text-2xl font-bold text-black">Edit Profile</h1>
            <h4 className="text-base font-bold text-[#CACED8]">Active Since {humanTimeDiff(user?.inserted_time)} Days</h4>
        </div>
        <div className="mt-10 w-full flex gap-x-16">
            <div className="w-full">
              <h4 className="text-base font-bold text-[#CACED8] mb-6">Personal</h4>
                   <InputWithLabel
                       width={350}
                       label={"Name"}
                       value={values.name}
                       onChange={(e:InputEvent)=>onChangeInputValue("name",e)}
                       touched={touched.name}
                       errorText={errors.name}
                   />
                    <InputWithLabel
                       width={350}
                       label={"Email"}
                       value={values.email}
                       onChange={(e:InputEvent)=>onChangeInputValue("email",e)}
                       touched={touched.email}
                       errorText={errors.email}
                   />

                 <InputWithLabel
                       width={350}
                       label={"Mobile"}
                       value={values.mobile}
                       onChange={(e:InputEvent)=>onChangeInputValue("mobile",e)}
                       touched={touched.mobile}
                       errorText={errors.mobile}
                 />
                </div>
            </div>
            <div className="mt-10">
                <button onClick={()=>handleSubmit()} type="button" className="w-[350px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                 { isLoading ? <Spinner/> : "Save"}
            </button>
            </div>
        </div>
    )
}
export default EditProfile;

