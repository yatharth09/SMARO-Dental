import React from "react";
import ReactSlider from "react-slider";
import "./slider-button.css";

type Props = {
  value: number;
  setValue: (value: number) => void;
};

const SliderButton: React.FC<Props> = ({ value, setValue }) => {
  return (
    <ReactSlider
      className="vertical-slider"
      thumbClassName="thumb"
      trackClassName="track"
      orientation="vertical"
      minDistance={100}
      defaultValue={value}
      max={100}
      renderThumb={({ key, ...props }, state) => (
        <div key={key} {...props}>
          {state.valueNow}
        </div>
      )}
      onAfterChange={(e) => {
        setValue(e);
      }}
    />
  );
};

export default SliderButton;
