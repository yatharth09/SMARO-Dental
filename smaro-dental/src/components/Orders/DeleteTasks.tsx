import {Fragment, useRef,} from "react"
import {Dialog, Transition} from "@headlessui/react"
import closeIcon from "@/assets/svg/x-mark.svg"
import trashIcon from "@/assets/svg/trash-alt-red.svg"


interface OwnProps {
    show: boolean;
    setShow: (value: boolean) => void;
}

type Props = OwnProps;

export default function DeleteTasks({show, setShow}: Props) { 
    

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

                <div className="fixed inset-0 z-10  overflow-y-auto">
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
                                style={{width: "42.875rem", height: "28.563rem"}}
                                className="relative transform rounded-lg bg-white text-left shadow-xl  transition-all sm:my-8 w-[calc(100%-62px)]">
                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b-2">
                                    <div className="sm:flex sm:items-start">
                                        <div className=" text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <div className="flex justify-between w-full">
                                                <Dialog.Title as="h3"
                                                              className="text-base font-semibold leading-6 text-gray-900">
                                                   Delete Tasks 
                                                </Dialog.Title>
                                                <img className="text-blue-500 w-5" src={closeIcon} onClick={() => setShow(false)} alt="" />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col py-10 justify-center text-black items-center h-[70%] gap-y-10">
                                <img src={trashIcon} alt="" />
                            <h1 className="font-bold text-xl">Are you sure you want to permanently delete this tasks ?</h1>
                            
                            <div className="text-center">
                                <h4 className="font-bold">Please consider the following:</h4>
                                <p>- This action is irreversible, Your data cannot be recovered</p>
                            </div>
                          </div>
                             
                                <div className=" absolute bottom-0 h-[71px] border-t border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">
                                    <button onClick={()=>{
                                        setShow(false)
                                    }}  className="bg-[#6C757D] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                                        Cancel
                                    </button>
                                    <button className="bg-red-500 rounded-[4px] text-base font-semibold px-4 py-[10px]">
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

