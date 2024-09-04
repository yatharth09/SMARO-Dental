import {Fragment, useRef,} from "react"
import {Dialog, Transition} from "@headlessui/react"
import closeIcon from "@/assets/svg/x-mark.svg"
import LabelWithInput from "../Common/LabelWithInput";
import fileIcon from "@/assets/svg/file.svg"

interface OwnProps {
    show: boolean;
    setShow: (value: boolean) => void;
}

type Props = OwnProps;

export default function CreateModal({show, setShow}: Props) {

    const cancelButtonRef = useRef(null)
    const InputRef = useRef<HTMLInputElement>(null)


    const fileUploadFn = () => {
        if(InputRef.current){
            InputRef.current.click()
        }
    }


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
                                                    Upload DCM Files
                                                </Dialog.Title>
                                                <img className="text-blue-500 w-5" src={closeIcon} onClick={() => setShow(false)} alt="" />
                                            </div>


                                        </div>
                                    </div>
                                </div>
                               <div className="flex px-10 justify-start gap-x-8 mt-10">
                                <LabelWithInput
                                    label="Patient Name"
                                    width="276"
                                    onChange={()=>{}}
                                     touched={false}
                                     value={""}
                                />
                                <LabelWithInput
                                    label="Comments"
                                    width="700"
                                    onChange={()=>{}}
                                     touched={false}
                                     value={""}
                                />

                               </div>
                              <div className="w-full px-10 mt-10">
                              <div  className="bg-[#F7FAFF] rounded-lg w-full flex justify-center h-[19.75rem] items-center border border-dashed border-gray-300">
                                    <div className="flex flex-col text-[1.25rem] text-black  justify-center items-center">
                                        <img src={fileIcon} alt="" />
                                        <h1 className="mt-3">Drag & Drop</h1>
                                        <div className="flex gap-x-3">
                                            <p>or</p>
                                            <p onClick={fileUploadFn} className="text-[#0D6EFD] cursor-pointer">browse</p>
                                            <input ref={InputRef} type="file" className="hidden" />
                                        </div>
                                    </div>
                               </div>
                               <div className="text-black mt-10">
                                <h2 className="font-semibold">Instructions:</h2>
                                <p>Supported file types: DCM</p>
                                <p>Drag and drop files or browse to select</p>
                               </div>
                              </div>
                                <div className=" absolute bottom-0 h-[71px] border-t border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">
                                    <button onClick={()=>{
                                        setShow(false)
                                    }}  className="bg-[#6C757D] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                                            Cancel
                                    </button>
                                    <button onClick={()=>{
                                    }} className="bg-[#0D6EFD] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                                        Submit
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

