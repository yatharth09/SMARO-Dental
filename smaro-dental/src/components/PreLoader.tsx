import React from "react";
import {DNA as LoaderSvg} from "react-loader-spinner";

interface OwnProps {
    visible:boolean
}

type Props = OwnProps;

const PreLoader: React.FC<Props> = ({visible}) => {

    if(!visible)
    {
        return null;
    }
  return (
      <div style={{
          zIndex:9999
      }} className="absolute bg-black bg-opacity-60 z-10 h-screen w-screen flex items-center justify-center">
      <div className="block items-center">
          <LoaderSvg
              visible={true}
              height="150"
              width="150"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
          />
        <span className="text-3xl mr-4">Loading...</span>
      </div>
    </div>);
};

export default PreLoader;
