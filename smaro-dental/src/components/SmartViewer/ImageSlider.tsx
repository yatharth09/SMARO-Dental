import React from "react";
import {isArray} from "@/utils/utils";

interface ImageProps {
    output_image: string;
    fracture_flag:string;
}
interface Props {
    isLoading:boolean;
    images: ImageProps[]
}

const ImageSlider: React.FC<Props> = ({isLoading,images}) => {

    if(isLoading|| !isArray(images))
    {
        return null;
    }
  return (
      <div className="flex flex-col gap-y-3">
          {
              images.map((item,index)=>{
                  return  <div key={index}>
                              <img src={item.output_image} style={styles.image} alt=""/>
                             <span className="text-sm font-bold text-red-500">{item.fracture_flag}</span>
                          </div>
              })
          }
    </div>
  );
};

const styles = {
    image: {
        width: "100%",
        height:"350px"
    }
}

export default ImageSlider;
