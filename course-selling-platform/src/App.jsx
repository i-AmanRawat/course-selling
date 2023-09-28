import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import AddCourse from "./components/Addcourse";
import Courses from "./components/Courses";
import Course from "./components/Course";
import { useSetRecoilState } from "recoil";
import { adminState } from "./store/atoms/admin";

function App() {
  const setAdmin = useSetRecoilState(adminState);

  async function init() {
    const token = localStorage.getItem("token");

    try {
      const res = await axios({
        method: "get", //default
        url: "http://localhost:3000/admin/me",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.username) {
        setAdmin({ isLoading: false, username: res.data.username });
      } else {
        setAdmin({ isLoading: false, username: null });
      }
    } catch (error) {
      setAdmin({
        isLoading: false,
        userEmail: null,
      });
    }
  }

  useEffect(() => {
    init();
  }, []);

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
