import React from "react";

const RadioButton = ({ name, isChecked, label, onChange, value }) => {
  return (
    <label>
      <input
        className="with-gap"
        name={name}
        type="radio"
        checked={isChecked}
        value={value}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
};

export default RadioButton;
