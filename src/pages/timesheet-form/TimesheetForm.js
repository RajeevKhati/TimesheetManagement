import React, { useState } from "react";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import { convertDateToString } from "../../utils/helper";
import { useDB } from "../../contexts/DBContext";
import { IN_PROCESS } from "../../utils/constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const TimesheetForm = () => {
  const [isWorkHoursChecked, setIsWorkHoursChecked] = useState(true);
  const [date, setDate] = useState(new Date("12-5-2019")); //new date accepts date in format mm-dd-y
  const [startTime, setStartTime] = useState("9:00");
  const [endTime, setEndTime] = useState("18:00");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState();
  const { addTimesheet } = useDB();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const toggle = () => {
    setIsWorkHoursChecked((prev) => !prev);
  };
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const dateToString = convertDateToString(date);
    const submitData = {
      date: dateToString,
      status: IN_PROCESS,
      startTime,
      endTime,
      desc,
      type: isWorkHoursChecked ? "workHours" : "leave",
    };
    if (!isWorkHoursChecked && file) {
      submitData.fileName = `${currentUser.uid}-${file.name}`;
      submitData.file = file;
    }
    try {
      await addTimesheet(submitData);
      navigate("/timesheet");
    } catch (err) {
      console.log("timesheet form submit error => ", err);
    }
  };
  return (
    <div
      className="container-md"
      style={{ maxWidth: 400, paddingTop: 20, paddingBottom: 20 }}
    >
      <p className="fs-2 text-center">Add Timesheet</p>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Check
                type="radio"
                id="Work Hours"
                label="Work Hours"
                name="formType"
                checked={isWorkHoursChecked}
                value={"workHours"}
                onChange={toggle}
              />
            </Col>
            <Col>
              <Form.Check
                type="radio"
                id="Leave"
                label="Leave"
                name="formType"
                checked={!isWorkHoursChecked}
                value={"leave"}
                onChange={toggle}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="date" style={{ marginRight: 10 }}>
            Date
          </Form.Label>
          <DatePicker
            onChange={setDate}
            value={date}
            name="date"
            format="dd-MM-y"
            id="date"
          />
        </Form.Group>
        <Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label htmlFor="startTime" style={{ marginRight: 10 }}>
              Start Time
            </Form.Label>
            <TimePicker
              value={startTime}
              name="startTime"
              onChange={setStartTime}
              id="startTime"
            />
          </Form.Group>
          <Form.Group as={Col} className="mb-3">
            <Form.Label htmlFor="endTime" style={{ marginRight: 10 }}>
              End Time
            </Form.Label>
            <TimePicker
              value={endTime}
              name="endTime"
              id="endTime"
              onChange={setEndTime}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            as="textarea"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            label="Description"
            id="description"
          />
        </Form.Group>

        {!isWorkHoursChecked && (
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload leave email</Form.Label>
            <Form.Control type="file" onChange={handleChange} />
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default TimesheetForm;
