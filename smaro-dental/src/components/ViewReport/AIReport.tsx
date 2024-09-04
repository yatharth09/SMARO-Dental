import React from "react";
import ImageSlider from "./ImageSlider";

interface ImageProps {
    output_image: string;
    fracture_flag:string;
}


interface DiagnosisViewInputProps {
    images: ImageProps[];
    isLoading:boolean;
}

const AIReport: React.FC<DiagnosisViewInputProps> = ({images,isLoading})=> {


    return(
         <div className="w-full h-full p-2">
           <div className="p-2 my-2 bg-gray-100 shadow">
              <h4 className="text-medium text-black font-bold">Disclaimer :-</h4>
              <p className="text-xs text-red-800 text-justify font-bold">The information and recommendations provided are based on the patients history and imaging data.</p>
              <p className="text-xs text-red-800 text-justify font-bold">   This consultation is intended for professional advice only and should not replace clinical judgment.</p>
            </div>
              {
                          isLoading &&  <div className=" w-full h-full bg-[#00000080] justify-center content-center items-center text-center">
                                          <span className="text-white font-bold text-sm">...loading,please wait</span>
                                      </div>
              }
               <ImageSlider  images={images} />
        </div>
    )

}

export default AIReport;
