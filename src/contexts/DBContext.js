import React, { useContext, useEffect, useState } from "react";
import {
  auth,
  onAuthStateChanged,
  doc,
  setDoc,
  db,
  updateDoc,
  arrayUnion,
  getDoc,
  query,
  collection,
  getDocs,
  storage,
  ref,
  uploadBytes,
} from "../firebase";
import { COLLECTION_EMPLOYEES } from "../utils/constants";
import { useAuth } from "./AuthContext";

const DBContext = React.createContext();

const DBProvider = ({ children }) => {
  const [timesheetList, setTimesheetList] = useState(null); //for particular employee
  const [employees, setEmployees] = useState(null); //only for manager
  const [isManager, setIsManager] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email === "admin@tsm.com") {
          //this is manager, fill employees array
          await getEmployees();
          setIsManager(true);
        } else {
          //this is an employee, fill timesheetList
          await getTimesheet(user);
          setIsManager(false);
        }
      } else {
        setTimesheetList(null);
        setEmployees(null);
        setIsManager(false);
      }
    });
    return unsubscribe;
  }, []);

  const addTimesheet = async (data) => {
    const uid = currentUser.uid;
    if (data.fileName) {
      const { file, ...restData } = data;
      data = restData;
      const fileRef = ref(storage, `leaveEmails/${data.fileName}`);
      uploadBytes(fileRef, file).then((snapshot) => {
        console.log("Uploaded a file!");
      });
    }
    const finalData = {
      data: arrayUnion(data),
    };
    const employeeRef = doc(db, COLLECTION_EMPLOYEES, uid);
    const { displayName, email, phoneNumber } = currentUser;
    const employeeSnap = await getDoc(employeeRef);
    if (employeeSnap.exists()) {
      await updateDoc(employeeRef, finalData);
    } else {
      await setDoc(employeeRef, {
        ...finalData,
        employee: { displayName, email, uid, phoneNumber },
      });
    }
    return getTimesheet(currentUser);
  };

  const getTimesheet = async (currentUser) => {
    const uid = currentUser.uid;
    const employeeRef = doc(db, COLLECTION_EMPLOYEES, uid);
    const employeeTimesheets = await getDoc(employeeRef);
    setTimesheetList(employeeTimesheets.data()?.data);
  };

  //will only be used by manager
  const approveTimesheet = async (employeeUid, date, status) => {
    const employeeRef = doc(db, COLLECTION_EMPLOYEES, employeeUid);
    const employeeTimesheets = await getDoc(employeeRef);
    const currentEmployeeData = employeeTimesheets.data().data;
    const updatedData = currentEmployeeData.map((emp) => {
      if (emp.date === date) {
        return { ...emp, status };
      }
      return emp;
    });
    await updateDoc(employeeRef, { data: updatedData });
    getEmployees();
  };

  const getEmployees = async () => {
    const q = query(collection(db, COLLECTION_EMPLOYEES));
    const querySnapshot = await getDocs(q);
    const listOfEmployees = [];
    querySnapshot.forEach((doc) => listOfEmployees.push(doc.data()));
    setEmployees(listOfEmployees);
  };

  const value = {
    //for employees
    timesheetList,
    addTimesheet,
    getTimesheet,
    //for manager
    employees,
    approveTimesheet,
    getEmployees,
    isManager,
  };

  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
};

export const useDB = () => {
  return useContext(DBContext);
};

export default DBProvider;
