import "./App.css";
import SignUp from "./pages/sign-up/SignUp";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Login from "./pages/login/Login";
import ViewTimesheet from "./pages/view-timesheet/ViewTimesheet";
import TimesheetForm from "./pages/timesheet-form/TimesheetForm";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/home/Home";
import { Container, Navbar } from "react-bootstrap";
import { useAuth } from "./contexts/AuthContext";
import { Logout } from "./components/Logout";
import PhoneSignUp from "./pages/phone-sign-up/PhoneSignUp";

function App() {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Navbar bg="primary" variant="dark" className="mb-3">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Timesheet
          </Navbar.Brand>
          <Navbar.Toggle />
          {currentUser && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Logout />
              </Navbar.Text>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} /> {/**Only Redirecting */}
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="phoneSignUp" element={<PhoneSignUp/>} />
        <Route
          path="timesheet"
          element={
            <RequireAuth>
              <ViewTimesheet />
            </RequireAuth>
          }
        />
        <Route path="timesheet/add" element={<TimesheetForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
