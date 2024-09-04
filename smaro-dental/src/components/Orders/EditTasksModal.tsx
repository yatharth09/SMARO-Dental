import {Fragment, useRef, useState,} from "react"
import {Dialog, Transition} from "@headlessui/react"
import closeIcon from "@/assets/svg/x-mark.svg"
import LabelWithInput from "../Common/LabelWithInput";
import Select from "../Common/Select";
import LabelContainer from "../Common/LabelContainer";
import {InputEvent} from "@/types";

interface OwnProps {
    show: boolean;
    setShow: (value: boolean) => void;
    data?:any
}

type Props = OwnProps;

export default function EditTasksModal({show, setShow,data}: Props) {

    const cancelButtonRef = useRef(null)

    const [values,setValues] = useState({
            priority:data?.prority
            ,availability:data?.status
            ,user:data?.assigneeName
            ,dueDate:`${data?.dueDate.date}${data?.dueDate.time}`
    })

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
                                style={{width: "1063px", height: "384px"}}
                                className="relative transform rounded-lg bg-white text-left shadow-xl  transition-all sm:my-8 w-[calc(100%-62px)]">
                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b-2">
                                    <div className="sm:flex sm:items-start">
                                        <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <div className="flex justify-between w-full">
                                                <Dialog.Title as="h3"
                                                              className="text-base font-semibold leading-6 text-gray-900">
                                                Edit task
                                                </Dialog.Title>
                                                <img className="text-blue-500 w-5" src={closeIcon} onClick={() => setShow(false)} alt="" />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                               <div className="w-full h-full grid grid-cols-3 px-20 py-5 pb-32">

                                    <LabelWithInput
                                        value={values.priority}
                                        onChange={(e:InputEvent)=>setValues({...values,priority:e.target.value})}
                                        label="Priority"
                                        width="276"
                                       touched={false}
                                    />
                                    <LabelWithInput
                                        value={values.availability}
                                        onChange={(e:InputEvent)=>setValues({...values,availability:e.target.value})}
                                        label="Availability"
                                        width="276"
                                       touched={false}
                                    />
                                    <LabelContainer label="User">
                                    <Select label={values.user || ""} options={[]} onChange={(val)=>setValues({...values,user:val})} width="17.25"  />
                                    </LabelContainer>
                                        <LabelWithInput
                                            value={values.dueDate}
                                            onChange={(e:InputEvent)=>setValues({...values,dueDate:e.target.value})}
                                            label="Due date"
                                            type="datetime-local"
                                            width="276"
                                            touched={false}
                                        />

                               </div>

        <div className=" absolute bottom-0 h-[71px] border-t border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">
            <button onClick={()=>{
                setShow(false)
            }}  className="bg-[#6C757D] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                    Cancel
            </button>
            <button onClick={()=>{
            }} className="bg-[#0D6EFD] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                Edit
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

