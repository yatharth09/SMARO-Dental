import React from "react";

interface ChipProps {
  text: string;
  onClick?: () => void;
}

const CustomOption: React.FC<ChipProps> = ({ text, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center px-3 py-1 bg-blue-200 text-blue-800 rounded-full cursor-pointer"
    >
      <span>{text}</span>
    </div>
  );
};

export default CustomOption;
