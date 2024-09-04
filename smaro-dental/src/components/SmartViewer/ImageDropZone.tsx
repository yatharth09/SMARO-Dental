import React, {useCallback} from "react";
import {useDropzone} from "react-dropzone";
import {isStr, isArray} from "@/utils/utils";
import {notify} from "@/utils/notify";
import {api} from "@/api/api";

interface OwnProps {
    setImages : (params:any) => void;
    setIsLoading? : (value: boolean) => void;
}

type Props = OwnProps;

const ImageDropZone: React.FC<Props> = ({setImages, setIsLoading}) => {
     const onDrop = useCallback(async (acceptedFiles: any) => {
         if(!isArray(acceptedFiles))
         {
             setIsLoading && setIsLoading(false);
             notify("Invalid file selected");
         }

              const file = acceptedFiles[0];
             if(file===undefined||file===null)
            {
                notify("Invalid file");
                return;
            }

              const headers = new Headers();
              headers.append("Content-Type", "application/json");
              const formData = new FormData();
              formData.append("file",file);
          const requestOptions = {
            method: "POST",
            headers: headers,
            body: formData,
        };
            setIsLoading && setIsLoading(true);
         const response = await fetch(api.endpoints.upload.image, requestOptions);
        if (response.ok && response.status === 200) {
             setIsLoading && setIsLoading(false);
             const result:{output_image:string} = await response.json();
             if(isStr(result.output_image))
             {
                 setImages((prev: string[])=>[...prev,...[result.output_image]]);
             }
             console.log(result);
        } else {
             setIsLoading && setIsLoading(true);
            notify("Something went wrong,please try again");
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone(
        {
            onDrop,
            maxFiles: 1,
            accept: {
                 "image/png": [".png"],
                "image/jpeg": [".jpeg"],
                "image/jpg": [".jpg"],
            }
        })

  return (
      <div className="container bg-[#F7FAFF] rounded-lg w-full flex justify-center h-[5rem] items-center border border-dashed border-gray-300">
          <div {...getRootProps()}>
          <input className="text-black" {...getInputProps()} />
          {
            isDragActive ?
              <p className="text-gray-800">Drop the file here ...</p> :
              <p className="text-gray-800">Drag and drop png or jpg file here, or click to select file</p>
          }
    </div>
     </div>);
};

export default ImageDropZone;
