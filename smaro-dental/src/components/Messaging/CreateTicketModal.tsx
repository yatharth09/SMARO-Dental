import {Fragment, FunctionComponent, useEffect, useRef, useState} from "react"
import {Dialog, Transition} from "@headlessui/react"
import {XMarkIcon as CloseIcon} from "@heroicons/react/16/solid";

import * as Yup from "yup";
import {useFormik,FormikValues} from "formik";
import LabelSelectBox from "../Common/LabelSelectBox";
import {api} from "@/api/api";

interface CreateTicketModalProps {
    show:boolean;
    setShow:(arg:boolean)=>void;
    onSubmit: (params:any)=>void;
}

const validationSchema = Yup.object().shape({
    category_id:Yup.string().required().label("Category"),
    message:Yup.string().optional().nullable().label("Message"),
})


const CreateTicketModal: FunctionComponent<CreateTicketModalProps> = ({show,setShow,onSubmit}) => {
    const cancelButtonRef = useRef(null);
    const [categories, setCategories] = useState<any[]>([]);
    const {errors,values,touched,setFieldValue,handleSubmit} = useFormik({
        initialValues: {
            category_id:"",
            message:"",
        },
        validationSchema: validationSchema,
        onSubmit: (params:FormikValues)=>{
            onSubmit(params)
        }
    });

    const onSelect =(item:{label:string,value:number,color:string})=>{
     void setFieldValue("category_id",item.value);
    }

      const getCategories = async () => {
    try {
      const { status: apiStatus, data: apiData } = await api.get(api.endpoints.message.categories, {});
      if (apiStatus === 200) {
        const { statusCode, data } = apiData;
        if (statusCode === 200) {
          setCategories(data.map((item: {id:number; chat_caterogies: string; })=>{
              return {
                  label: item.chat_caterogies,
                  value: item.id,
              }
          }));
        }
      }
    } catch (e) {
      console.log(e);
      setCategories([])
    }
  };

useEffect(() => {
    if(show)
    {
        void (async () => {
          await getCategories();
        })();
    }
  }, [show]);


    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10 max-w-2xl" initialFocus={cancelButtonRef} onClose={setShow}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                               style={{width: "550px",height: "350px"}}
                                className="flex flex-col relative transform rounded-lg bg-white text-left shadow-xl  transition-all sm:my-8 w-[calc(100%-62px)]">
                                <div className="h-[15%] bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b-2">
                                    <div className="sm:flex sm:items-start">
                                        <div className="text-center sm:mt-0 sm:text-left w-full">
                                            <div className="flex justify-between w-full">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                   Raise A Ticket
                                                </Dialog.Title>
                                                <CloseIcon className="h-6 w-6 text-gray-500" onClick={() => setShow(false)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-[70%] px-4 p-1">
                                    <LabelSelectBox
                                        width={350}
                                        label={"Category"}
                                        value={values.category_id}
                                        setValue={onSelect}
                                        options={categories}
                                        errorText={errors?.category_id}
                                        touched={touched.category_id}
                                    />
                                   <div className="mt-5">
                                        <div className="mb-2">
                                           <h4 className="text-sm text-black">Message (Optional)</h4>
                                        </div>

                                        <input onChange={e=>setFieldValue("message",e.target.value)}  className="block w-full min-h-[5rem] p-2.5 text-sm text-black bg-gray-50 border border-gray-300 rounded-lg" />
                                   </div>
                                </div>
                               <div className="h-[15%] border-t border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">
                                        <button onClick={() => setShow(false)} className="bg-[#6C757D] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                                            Back
                                        </button>
                                        <button type="button" onClick={() => handleSubmit()} className="bg-[#0D6EFD] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                                            Next
                                        </button>
                               </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default CreateTicketModal;
