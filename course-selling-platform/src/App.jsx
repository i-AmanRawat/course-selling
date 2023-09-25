import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddCourse from "./components/Addcourse";
import Courses from "./components/Courses";
import Course from "./components/Course";

function App() {
  return (
    <div
      style={{ width: "100vw", height: "full", position: "relative" }} //, backgroundColor: "#eeeeee"
    >
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/addcourse"} element={<AddCourse />} />
          <Route path={"/courses"} element={<Courses />} />
          <Route path={"/course/:courseId"} element={<Course />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
