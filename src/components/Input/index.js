import React from "react";

const Input = ({ value, onChange, type, name, id, label }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
      />
    </>
  );
};

export default Input;
