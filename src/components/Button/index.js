import React from "react";

const Button = ({ onClick, text }) => {
  return (
    <button
      className="p-2 bg-blue-500"
      type="submit"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
