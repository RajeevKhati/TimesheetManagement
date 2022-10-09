import React, { useContext, useEffect, useState } from "react";
import {
  auth,
  onAuthStateChanged,
  doc,
  setDoc,
  db,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "../firebase";
import { useAuth } from "./AuthContext";

const DBContext = React.createContext();

const DBProvider = ({ children }) => {
  const [timesheetList, setTimesheetList] = useState(null); //for particular employee
  const [employees, setEmployees] = useState(null); //only for manager
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("current user from dbContext => ", user);
      if (user) {
        if (user.email === "admin@tsm.com") {
          //this is manager, fill employees array
        } else {
          //this is an employee, fill timesheetList
        }
      }
    });
    return unsubscribe;
  }, []);

  const addTimesheet = (data) => {
    const uid = currentUser.uid;
    const finalData = {
      // data: arrayUnion(data),
      data: arrayUnion(data),
    };
    const employeeRef = doc(db, "employees", uid);
    console.log(employeeRef);
    // return updateDoc(employeeRef, finalData);
    return setDoc(employeeRef, finalData);
  };

  const editTimesheet = (data) => {
    // const uid = currentUser.uid;
    // const finalData = {
    //   status: "inProcess",
    //   data: arrayUnion(data),
    // };
    // const employeeRef = doc(db, "employees", uid);
    // return updateDoc(employeeRef, finalData);
  };

  //will only be used by manager
  const approveTimesheet = () => {};

  const value = {
    timesheetList,
    employees,
    addTimesheet,
    editTimesheet,
    approveTimesheet,
  };

  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
};

export const useDB = () => {
  return useContext(DBContext);
};

export default DBProvider;
