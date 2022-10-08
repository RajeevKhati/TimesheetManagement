import React from "react";

const Button = ({ onClick, text }) => {
  return <button type="submit" onClick={onClick}>{text}</button>;
};

export default Button;
