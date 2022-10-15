import React, { useState } from "react";
import { APPROVE, REJECT } from "../../utils/constants";
import { Button, Modal, Stack, Table } from "react-bootstrap";

const ManagerTable = ({ employees, handleManagerAction }) => {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleClose = () => setShow(false);

  const handleRowClick = (timesheetData) => {
    setModalData(timesheetData);
    setShow(true);
  };

  const renderTable = ({ data, employee }) => {
    const timesheetList = data?.filter(
      (employeeTimesheetOfDay) => employeeTimesheetOfDay?.status === "inProcess"
    );

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
                  <td>
                    {status === "inProcess" && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() =>
                            handleManagerAction(employee.uid, date, APPROVE)
                          }
                        >
                          Approve
                        </Button>
                        <Button
                        style={{marginLeft:4}}
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            handleManagerAction(employee.uid, date, REJECT)
                          }
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
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

  const renderEmployee = (emp, index) => {
    const { employee } = emp;
    return (
      <>
        <p>
          {employee?.displayName && `Name : ${employee?.displayName}`}{" "}
          {employee?.email && `Email : ${employee?.email}`}
        </p>
        {renderTable(emp)}
      </>
    );
  };
  return employees?.map(renderEmployee);
};

export default ManagerTable;
