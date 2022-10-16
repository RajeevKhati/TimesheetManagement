import React, { useState } from "react";
import { APPROVE, REJECT } from "../../utils/constants";
import { Button, Modal, Stack, Table } from "react-bootstrap";
import useDownloadFile from "../../utils/useDownloadFile";

const ManagerTable = ({ employees, handleManagerAction }) => {
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { downloadFile } = useDownloadFile();

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
                        style={{ marginRight: 4, marginBottom:4, marginTop:4 }}
                          variant="success"
                          size="sm"
                          onClick={() =>
                            handleManagerAction(employee.uid, date, APPROVE)
                          }
                        >
                          Approve
                        </Button>
                        <Button
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
              {modalData?.fileName && (
                <p className="fs-5">
                  Leave Email : {modalData.fileName.split("-").pop()}{" "}
                  <Button
                    style={{ marginLeft: 4 }}
                    variant="success"
                    size="sm"
                    onClick={() => downloadFile(modalData.fileName)}
                  >
                    Download
                  </Button>{" "}
                </p>
              )}
            </Stack>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  const renderEmployee = (emp, index) => {
    const { employee } = emp;
    return (
      <React.Fragment key={employee.uid}>
        <p>
          {employee?.displayName && `Employee Name : ${employee?.displayName}`}{" "}
          {employee?.email && `Employee Email : ${employee?.email}`}
        </p>
        {renderTable(emp)}
      </React.Fragment>
    );
  };

  return employees?.map(renderEmployee);
};

export default ManagerTable;
