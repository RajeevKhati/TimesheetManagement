import React, { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import RadioButton from "../../components/RadioButton";
import TextArea from "../../components/Textarea";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

const TimesheetForm = () => {
  const [isWorkHoursChecked, setIsWorkHoursChecked] = useState(true);
  const [date, setDate] = useState(new Date(2018, 11, 24));
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");
  const [desc, setDesc] = useState("");
  const toggle = () => {
    setIsWorkHoursChecked((prev) => !prev);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(date.getDate());
    console.log(date.getMonth());
    console.log(date.getFullYear());
    console.log(startTime);
    console.log(endTime);
    console.log(desc);
  };
  return (
    <Card>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="flex">
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
        </div>
        <DatePicker
          onChange={setDate}
          value={date}
          name="date"
          format="dd-MM-y"
        />
        <TimePicker
          value={startTime}
          name="startTime"
          onChange={setStartTime}
        />
        <TimePicker value={endTime} name="endTime" onChange={setEndTime} />
        <TextArea
          value={desc}
          type="text"
          name="desc"
          onChange={(e) => setDesc(e.target.value)}
          id="desc"
          label="Description"
        />
        <Button text={"save"} onClick={() => {}} />
      </form>
    </Card>
  );
};

export default TimesheetForm;
