import React from "react";

const TypingIndicator : React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="dot bg-gray-400 w-2 h-2 rounded-full animate-bounce"></div>
      <div className="dot bg-gray-400 w-2 h-2 rounded-full animate-bounce delay-200"></div>
      <div className="dot bg-gray-400 w-2 h-2 rounded-full animate-bounce delay-400"></div>
      <span className="text-gray-500">Typing...</span>
    </div>
  );
};

export default TypingIndicator;
