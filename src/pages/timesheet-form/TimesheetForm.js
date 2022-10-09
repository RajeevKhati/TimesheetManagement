import React, { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import RadioButton from "../../components/RadioButton";
import TextArea from "../../components/Textarea";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import { convertDateToString } from "../../utils/helper";
import { useDB } from "../../contexts/DBContext";

const TimesheetForm = () => {
  const [isWorkHoursChecked, setIsWorkHoursChecked] = useState(true);
  // const [date, setDate] = useState(new Date(2018, 11, 24));
  const [date, setDate] = useState(new Date("12-5-2019")); //new date accepts date in format mm-dd-y
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("10:00");
  const [desc, setDesc] = useState("");
  const { addTimesheet } = useDB();
  const toggle = () => {
    setIsWorkHoursChecked((prev) => !prev);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const dateToString = convertDateToString(date);
    const submitData = {
      date: dateToString,
      status: "inProcess",
      startTime,
      endTime,
      desc,
    };
    addTimesheet(submitData);
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
