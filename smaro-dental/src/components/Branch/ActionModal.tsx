import React, { useEffect, useRef} from "react";
import {DiagnosticCenter} from "@/types";
import {FormikValues} from "formik";
import {PencilIcon,TrashIcon} from "@heroicons/react/16/solid";

interface Props {
    item: DiagnosticCenter | FormikValues;
    closeModal: any;
    onActionBtnPress :(type:"create"|"edit"|"delete")=>void;
    position: { x: number; y: number };
}

const ActionModal: React.FC<Props> = ({ closeModal,onActionBtnPress,position }) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target && ref.current && !ref.current.contains(e.target as Node)) {
        // Logic to handle clicks outside the modal
        closeModal();
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside, true);

      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [closeModal]);

     const modalStyle: React.CSSProperties = {
        position: "absolute",
        top: `${position.y}px`, // Adjust based on the actual height of the modal
        left: `${position.x}px`,
    };

    return (
      <div ref={ref} style={modalStyle} className="w-48 h-[80px] justify-center content-center p-2 absolute right-0 bg-white  border border-gray-200 shadow-md rounded-lg">
          <ul className="flex flex-col gap-y-2">
              <li>
                 <button className="flex flex-row gap-x-3 border-gray-500">
                   <PencilIcon className="w-[18px] h-[18px] text-blue-500"/>
                    <p onClick={()=>onActionBtnPress("edit")} className="text-sm cursor-pointer">Edit</p>
                 </button>
              </li>
             <li>
                  <button className="flex flex-row gap-x-3 border-gray-500">
                   <TrashIcon className="w-[18px] h-[18px] text-red-600"/>
                   <p onClick={()=>onActionBtnPress("delete")} className="text-sm cursor-pointer">Delete</p>
                  </button>
             </li>
          </ul>


      </div>
    );
  };

  export default ActionModal
