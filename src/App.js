import "./App.css";
import TimesheetForm from "./pages/timesheet-form/TimesheetForm";
import ViewTimesheet from "./pages/view-timesheet/ViewTimesheet";

function App() {
  return (
    <div className="App">
      {/* <div class="waves-effect waves-light btn">button</div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      <TimesheetForm />
      <ViewTimesheet />
    </div>
  );
}

export default App;
