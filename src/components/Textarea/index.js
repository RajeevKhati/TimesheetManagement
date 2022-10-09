import React from "react";

const TextArea = ({ value, onChange, name, id, label }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <textarea value={value} onChange={onChange} name={name} id={id} rows="4" cols="50" />
    </>
  );
};

export default TextArea;
