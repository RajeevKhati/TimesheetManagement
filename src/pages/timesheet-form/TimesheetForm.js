import React, { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import RadioButton from "../../components/RadioButton";

const TimesheetForm = () => {
  const [isWorkHoursChecked, setIsWorkHoursChecked] = useState(true);
  const toggle = () => {
    setIsWorkHoursChecked((prev) => !prev);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <Card>
      <form onSubmit={onSubmit}>
        <RadioButton
          name="formType"
          isChecked={isWorkHoursChecked}
          label="Work Hours"
          value={"workHours"}
          onChange={toggle}
        />
        <RadioButton
          name="formType"
          isChecked={!isWorkHoursChecked}
          label="Leave"
          value={"leave"}
          onChange={toggle}
        />
        <Button text={"save"} onClick={() => {}} />
      </form>
    </Card>
  );
};

export default TimesheetForm;
