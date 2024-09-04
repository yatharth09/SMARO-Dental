import React, {useEffect, useState} from "react"
import LabelWithInput from "@/components/Common/LabelWithInput";

import * as Yup from "yup";
import {FormikValues, useFormik} from "formik";
import {InputEvent, ProfileTypes} from "@/types";
import LabelSelectBox from "@/components/Common/LabelSelectBox";
import {api} from "@/api/api";
import CustomImageUpload from "@/components/Common/CustomImageUpload";
import {IoMdTrash} from "react-icons/io";
import {showErrorToast, showSuccessToast} from "@/utils/notify";

interface OwnProps {
    radiologist: ProfileTypes
    onSubmit: (params: ProfileTypes | FormikValues) => unknown;
}

type Props = OwnProps;
const validationSchema = Yup.object().shape({
    radiologist_name: Yup.string().required().label("Name"),
    radiologist_image: Yup.string().required().label("Image"),
    mobile: Yup.string().required().length(10).label("Mobile Number"),
    email: Yup.string().required().email().label("Email"),
    address: Yup.string().required().label("Address"),
    city: Yup.string().required().label("City"),
    gender: Yup.string().required().label("Gender"),
    state_id: Yup.number().required().label("State"),
    age: Yup.number().required().label("Age"),
    medical_degree_file: Yup.string().optional().label("Medical Degree"),
    board_cert_file: Yup.string().optional().label("Board certifications"),
});


const gender_options = [
    {
        label: "Male",
        value: "Male",
        color: "blue",
    },
    {
        label: "Female",
        value: "Female",
        color: "pink",
    },
    {
        label: "Other",
        value: "Other",
        color: "grey",
    },
]


const EditProfileTab: React.FC<Props> = ({radiologist, onSubmit}: Props) => {

    const [states, setStates] = useState<any[]>([]);
    const [signature, setSignature] = useState("")
    const [signatureId, setSignatureId] = useState<number>()
    const initialValues = {
        radiologist_name: "",
        radiologist_image: "",
        mobile: "",
        email: "",
        gender: "",
        age: "",
        address: "",
        city: "",
        state_id: 0,
        medical_degree_file: "",
        board_cert_file: "",
        medical_council_id: 0,
        medical_college_id: 0,
        medical_degree_id: 0
    }

    const {values, touched, errors, handleSubmit, setFieldValue} = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (params: ProfileTypes | FormikValues) => {
            onSubmit(params);
            signature.length && await signatureFns.create()
        }
    });

    const signatureFns = {
        create: async () => {
            const payload = {
                radiologist_id: radiologist.id,
                signature
            }
            try {
                const {data: apiData} = await api.post(api.endpoints.radiologistSignature.create, payload)
                const {data, statusCode} = apiData

                if (statusCode === 200) {
                    showSuccessToast(data)
                }

            } catch (e) {
                showErrorToast("Something went wrong!")
            }
        },
        get: async () => {
            try {
                const {data: apiData} = await api.get(`${api.endpoints.radiologistSignature.get}/${radiologist.id}`)
                const {data, statusCode} = apiData

                if (statusCode === 200) {
                    setSignature(data.signature)
                    setSignatureId(data.id)
                }

            } catch (e) {
                console.error(e)
            }
        },
        update: async () => {
            const payload = {
                signatureId, signature
            }
            try {
                const {data: apiData} = await api.put(api.endpoints.radiologistSignature.update, payload)
                const {data, statusCode} = apiData

                if (statusCode === 200) {
                    showSuccessToast(data)
                }

            } catch (e) {
                showErrorToast("Something went wrong!")

            }
        },
        delete: async () => {
            const payload = {
                signatureId
            }

            try {
                const {data: apiData} = await api.put(api.endpoints.radiologistSignature.delete, payload)
                const {data, statusCode} = apiData

                if (statusCode === 200) {
                    showSuccessToast(data)
                    setSignatureId(undefined)
                }
            } catch (e) {
                showErrorToast("Something went wrong!")
            }
        }
    }

    const handleSignatures = async () => {
        if (signatureId && signature.length) {
            await signatureFns.update()
            return
        }
        signature.length ? await signatureFns.create() : await signatureFns.delete()

    }

    const fetchAllStates = async () => {
        const {status, data: apiData} = await api.get(api.endpoints.state.get, {});
        if (status === 200) {
            const {statusCode, data} = apiData;
            if (statusCode === 200) {
                const state_list = data.map((item: { id: number; state_name: string; }) => {
                    return {
                        value: item.id,
                        label: item.state_name,
                    }
                })
                setStates(state_list);
            }
        }
    }


    useEffect(() => {
        void (async () => {
            await fetchAllStates();
        })();
    }, []);

    useEffect(() => {
        void setFieldValue("radiologist_name", radiologist.radiologist_name);
        void setFieldValue("radiologist_image", radiologist.radiologist_image);
        void setFieldValue("email", radiologist.email);
        void setFieldValue("mobile", radiologist.mobile);
        void setFieldValue("gender", radiologist.gender);
        void setFieldValue("address", radiologist.address);
        void setFieldValue("pincode", radiologist.pincode);
        void setFieldValue("age", radiologist.age);
        void setFieldValue("city", radiologist.city);
        void setFieldValue("state_id", radiologist.state_id);
    }, [radiologist, setFieldValue]);


    const onChangeInputValue = (type: keyof ProfileTypes, e: InputEvent) => {
        void setFieldValue(type, e.target.value)
    }

    return (<div className="w-full">
            <div className="flex flex-col flex-wrap gap-y-4">
                <div className="flex flex-wrap gap-x-8">
                    <LabelWithInput
                        width={250}
                        label="Name"
                        theme="light"
                        onChange={(e: InputEvent) => onChangeInputValue("radiologist_name", e)}
                        value={values.radiologist_name}
                        touched={touched.radiologist_name}
                        errorText={errors.radiologist_name}
                    />
                    <LabelWithInput
                        width={250}
                        theme="light"
                        label="Phone Number"
                        onChange={(e: InputEvent) => onChangeInputValue("mobile", e)}
                        value={values.mobile}
                        touched={touched.mobile}
                        errorText={errors.mobile}
                    />
                    <LabelWithInput
                        width={250}
                        theme="light"
                        label="Email"
                        value={values.email}
                        onChange={(e: InputEvent) => onChangeInputValue("email", e)}
                        touched={touched.email}
                        errorText={errors.email}
                    />

                </div>
                <div className="flex flex-wrap gap-x-8">
                    <LabelSelectBox
                        label="Gender"
                        theme="light"
                        value={values.gender}
                        width={250}
                        setValue={option => setFieldValue("gender", option.value)}
                        options={gender_options}
                        touched={touched.gender}
                        errorText={errors.gender}
                    />
                    <LabelWithInput
                        width={250}
                        label="Age"
                        theme="light"
                        value={values.age}
                        onChange={(e: InputEvent) => onChangeInputValue("age", e)}
                        touched={touched.age}
                        errorText={errors.age}
                    />
                    <LabelWithInput
                        width={250}
                        label="address"
                        theme="light"
                        onChange={(e: InputEvent) => onChangeInputValue("address", e)}
                        value={values.address}
                        touched={touched.address}
                        errorText={errors.address}
                    />
                </div>

                <div className="flex flex-wrap gap-x-8">
                    <LabelWithInput
                        width={250}
                        label="City"
                        theme="light"
                        onChange={(e: InputEvent) => onChangeInputValue("city", e)}
                        value={values.city}
                        touched={touched.city}
                        errorText={errors.city}
                    />
                    <LabelWithInput
                        width={250}
                        label="Pincode"
                        theme="light"
                        onChange={(e: InputEvent) => onChangeInputValue("pincode", e)}
                        value={values.pincode}
                        touched={touched.pincode}
                        errorText={errors.pincode}
                    />
                    <LabelSelectBox
                        width={250}
                        label="State"
                        theme="light"
                        value={values.state_id}
                        setValue={(option: { value: number; }) => setFieldValue("state_id", option.value)}
                        touched={touched.state_id}
                        errorText={errors.state_id}
                        options={states}
                    />
                </div>
                <div className="flex flex-wrap gap-x-8">
                    <CustomSignature signatureFns={signatureFns} value={signature} setValue={setSignature}/>
                </div>

            </div>
            <div className="mt-5 text-right">
                <button type="button" onClick={async () => {
                    handleSubmit();
                    await handleSignatures()
                }}
                        className="bg-[#0D6EFD] rounded-[4px] text-white font-semibold px-4 py-[10px]">
                    Save Changes
                </button>
            </div>
        </div>
    )
}

export default EditProfileTab;

interface CustomSignatureProps {
    value: string;
    setValue: (filepath: string) => void;
    signatureFns: {
        create: () => Promise<void>
        get: () => Promise<void>
        update: () => Promise<void>
        delete: () => Promise<void>
    }
}

const CustomSignature: React.FC<CustomSignatureProps> = ({setValue, value, signatureFns}) => {

    useEffect(() => {
        void (async () => {
            await signatureFns.get()
        })()
    }, []);

    useEffect(() => {
        console.log(value, "value")
    }, [value]);

    return (
        <>
            <div key={value} className="relative">
                <CustomImageUpload
                    bold={true}
                    label="Upload signature"
                    value={value}
                    setValue={(value) => {
                        setValue(value)
                    }}
                />
                <IoMdTrash
                    className="absolute -top-2 -right-2 mt-2 mr-2 text-red-500 cursor-pointer"
                    size={24}
                    onClick={()=>setValue("")}
                />
            </div>
        </>
    )
}
