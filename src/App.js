import "./App.css";
import SignUp from "./pages/sign-up/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import ViewTimesheet from "./pages/view-timesheet/ViewTimesheet";
import TimesheetForm from "./pages/timesheet-form/TimesheetForm";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> {/**Only Redirecting */}
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route
          path="timesheet"
          element={
            <RequireAuth>
              <ViewTimesheet />
            </RequireAuth>
          }
        >
          {/* <Route path="add" element={<TimesheetForm />} /> */}
          {/* <Route path=":id" element={<UserProfile />} /> */}
        </Route>
        <Route path="timesheet/add" element={<TimesheetForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// This is a React Router v6 app
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Link,
//   Outlet,
// } from "react-router-dom";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="users" element={<Users />}>
//           <Route path="me" element={<OwnUserProfile />} />
//           <Route path=":id" element={<UserProfile />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// function Users() {
//   return (
//     <div>
//       <nav>
//         <Link to="me">My Profile</Link>
//       </nav>

//       <Outlet />
//     </div>
//   );
// }
