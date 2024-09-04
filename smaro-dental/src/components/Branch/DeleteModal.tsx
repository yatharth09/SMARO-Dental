import React, {Fragment, useRef} from "react"
import {Dialog, Transition} from "@headlessui/react"
import {XMarkIcon as CloseIcon} from "@heroicons/react/16/solid";
import trashIcon from "@/assets/svg/trash-alt-red.svg"
import { api } from "@/api/api";


interface OwnProps {
    show: boolean;
    setShow: (value: boolean) => void;
    id:string;
    onSubmit?: (params:any)=>any;
    fetchAll:()=>Promise<void>
}

type Props = OwnProps;



const DeleteModal: React.FC<Props> = ({show, setShow,id,fetchAll}) => {

    const handleDelete = async () => {
        const URL = `${api.endpoints.branch.delete}/${id}`
        const response = await api.delete(URL,{},{})
        if(response.status === 201){
            await fetchAll()
            setShow(false)
        }
    }

    const cancelButtonRef = useRef(null)



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
                                style={{width: "1200px", height: "750px"}}
                                className="relative transform rounded-lg bg-white text-left shadow-xl  transition-all sm:my-8 w-[calc(100%-62px)]">
                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b-2">
                                    <div className="sm:flex sm:items-start">
                                        <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <div className="flex justify-between w-full">
                                                <Dialog.Title as="h3"
                                                              className="text-base font-semibold leading-6 text-gray-900">
                                                    Delete Diagnostic
                                                </Dialog.Title>
                                                <CloseIcon className="h-6 w-6 text-gray-500" onClick={() => setShow(false)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center text-black items-center h-[70%] gap-y-10">
                            <div className="flex items-center justify-center w-[6.875rem] h-[6.875rem] rounded-full bg-[#F8D7DA]">
                                <img src={trashIcon} alt="" />
                            </div>
                            <h1 className="font-bold text-xl">Are you sure you want to permanently delete this diagnostic ?</h1>
                            <div className="text-center">
                                <h4 className="font-bold">Deleting your account will:</h4>
                                <p>- Irreversibly remove all your data from your platform.</p>
                                <p>- Terminate access to your account and any associated services.</p>
                            </div>
                            <div className="text-center">
                                <h4 className="font-bold">Please consider the following:</h4>
                                <p>- This action is irreversible, Your data cannot be recovered</p>
                            </div>
                            </div>
                                <div
                                    className="absolute bottom-0 h-[71px] border-t border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">

                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                         className="bg-[#ff3e3e] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                                        Delete
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

export default DeleteModal;
