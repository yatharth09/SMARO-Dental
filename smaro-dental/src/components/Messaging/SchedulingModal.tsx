import React, {Fragment, useRef} from "react";
import * as Yup from "yup";
import {useFormik, FormikValues} from "formik";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon as CloseIcon} from "@heroicons/react/16/solid";

interface OwnProps {
    show: boolean;
    setShow: (value: boolean) => void;
    onSubmit: (params: any) => any;
    setIsLoading? : (value: boolean) => void;
}
type Props = OwnProps;

const validationSchema = Yup.object().shape({
    from_time: Yup.string().required().label("Availability Hours"),
    to_time: Yup.string().required().label("Availability Hours"),
});


const SchedulingModal: React.FC<Props> = ({show, setShow, onSubmit}) => {


       const {values,setFieldValue,handleSubmit} = useFormik({
        validationSchema: validationSchema,
        initialValues: {
            from_time:"",
            to_time:"",
        },
        onSubmit: (params: FormikValues) => {
            const formattedSchedule = `From ${formatTime(params.from_time)} to ${formatTime(params.to_time)}`;
            onSubmit(formattedSchedule);
        }
    });

      const handleFromTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        void setFieldValue("from_time",event.target.value);
      };

      const handleToTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        void setFieldValue("to_time",event.target.value);
      };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? `0${minutes}` : minutes} ${suffix}`;
  };

    const cancelButtonRef = useRef(null);

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10 max-w-2xl" initialFocus={cancelButtonRef}
                    onClose={() => setShow(false)}>
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
                                style={{width: "650px"}}
                                className="relative transform rounded-lg bg-white text-left shadow-xl  transition-all sm:my-8 w-[calc(100%-62px)]">
                                <div className="bg-white px-4 p-1 sm:p-4 sm:pb-2 border-b-2">
                                    <div className="sm:flex sm:items-start">
                                        <div className="text-center sm:mt-0 sm:text-left w-full">
                                            <div className="flex justify-between w-full">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 capitalize">
                                                   Schedule your work hours
                                                </Dialog.Title>
                                                <CloseIcon className="h-6 w-6 text-gray-500" onClick={() => setShow(false)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                      <div>
                                          <div className="w-full px-10 py-2 flex flex-row">
                                            <label className="w-[10%] text-black font-bold" htmlFor="fromTime">From: </label>
                                            <input
                                              type="time"
                                              id="fromTime"
                                              value={values.from_time}
                                              onChange={handleFromTimeChange}
                                              required
                                              className="w-[90%] text-base font-normal text-black px-2 py-[5px] bg-white border border-[#DEE2E6] outline-none rounded-[6px]"
                                            />
                                          </div>
                                          <div className="w-full px-10 py-2 flex flex-row">
                                            <label className="w-[10%] text-black font-bold" htmlFor="toTime">To: </label>
                                            <input
                                              type="time"
                                              id="toTime"
                                              value={values.to_time}
                                              onChange={handleToTimeChange}
                                              required
                                              className="w-[90%] text-base font-normal text-black px-2 py-[5px] bg-white border border-[#DEE2E6] outline-none rounded-[6px]"
                                            />
                                          </div>
                                        </div>
                                </div>
                                <div className="h-[71px] border-t border-[#CED4DA] w-full flex gap-x-2 justify-end items-center px-4">
                                    <button onClick={() => setShow(false)} className="bg-[#6C757D] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                                        Back
                                    </button>
                                    <button type="button" onClick={() => handleSubmit()} className="bg-[#0D6EFD] rounded-[4px] text-base font-semibold px-4 py-[10px]">
                                        Update
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

export default SchedulingModal;
