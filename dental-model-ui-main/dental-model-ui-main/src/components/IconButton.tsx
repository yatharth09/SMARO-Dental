import React from "react";

interface OwnProps {
  children: React.ReactNode;
  onClick?: () => void;
}

type Props = OwnProps;

const IconButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
    >
      {children}
    </button>
  );
};

export default IconButton;
