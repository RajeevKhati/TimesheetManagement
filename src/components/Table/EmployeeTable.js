import React, { useState } from "react";
import { Modal, Stack, Table } from "react-bootstrap";

const EmployeeTable = ({ timesheetList }) => {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleClose = () => setShow(false);

  const handleRowClick = (timesheetData) => {
    setModalData(timesheetData);
    setShow(true);
  };

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {timesheetList?.map((timesheetData, index) => {
            const { type, date, status } = timesheetData;
            return (
              <tr
                key={`${index}-${date}`}
                onClick={() => handleRowClick(timesheetData)}
              >
                <td>{type === "leave" ? "Leave" : "Work Hours"}</td>
                <td>{date}</td>
                <td>{status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal
        style={{ textAlign: "center" }}
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Timesheet Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack className="col-md-5 mx-auto">
            <p className="fs-5">
              Type : {modalData?.type === "leave" ? "Leave" : "Work Hours"}
            </p>
            <p className="fs-5">Date : {modalData?.date}</p>
            <p className="fs-5">Start time : {modalData?.startTime}</p>
            <p className="fs-5">End time : {modalData?.endTime}</p>
            <p className="fs-5">Description : {modalData?.desc}</p>
            <p className="fs-5">Status : {modalData?.status}</p>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmployeeTable;
