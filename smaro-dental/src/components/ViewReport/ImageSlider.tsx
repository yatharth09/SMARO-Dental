import React, {useState} from "react";
import {strcmp} from "@/utils/utils";

interface ImageProps {
    output_image: string;
    fracture_flag:string;
}
interface Props {
    images: ImageProps[]
}

const ImageSlider: React.FC<Props> = ({images}) => {

    const [isLoaded,setIsLoaded] = useState(false);
  return (
      <div className="flex flex-col gap-y-3">
          {
              images.filter(item=>strcmp(item.output_image)!=="failure").map((item,index)=>{
                  return  <div className="w-[850px] h-[500px] rounded border border-purple-700 my-1 p-1" key={index}>
                      {
                          !isLoaded &&  <div className="absolute w-[850px] h-[500px] bg-[#00000080] justify-center content-center items-center text-center">
                                          <span className="text-white font-bold text-sm">...loading,please wait</span>
                                      </div>
                      }
                          <img onLoad={()=>setIsLoaded(true)} src={item.output_image} className="w-full h-[450px]" alt=""/>
                          <div className="mt-2 w-full text-right">
                             <button className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 font-bold rounded-lg text-sm px-5 py-1">{item.fracture_flag}</button>
                          </div>
                      </div>})
          }
    </div>
  );
};

export default ImageSlider;
