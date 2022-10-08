import React from "react";

const Input = ({ value, onChange, type }) => {
  return <input type={type} value={value} onChange={onChange} />;
};

export default Input;
