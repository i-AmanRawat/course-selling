import axios from "axios";
import { Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  async function init() {
    const token = localStorage.getItem("token");
    const res = await axios({
      method: "get", //default
      url: "http://localhost:3000/admin/me",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.username) {
      setUsername(res.data.username);
    }
  }

  useEffect(() => {
    init();
  }, []);

  if (username) {
    return (
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "40px",
          // background: "#eeeeee",
        }}
      >
        <div
          style={{
            padding: "10px 50px 10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography variant="h6">
              <strong>COURSE~ADDA</strong>
            </Typography>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "10px" }}>
              <Button
                onClick={() => {
                  navigate("/addcourse");
                }}
              >
                Add course
              </Button>
            </div>
            <div style={{ marginRight: "10px" }}>
              <Button
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Courses
              </Button>
            </div>
            <div style={{ marginRight: "10px" }}>
              <Button
                variant={"contained"}
                onClick={() => {
                  localStorage.setItem("token", null);
                  window.location = "/";
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "40px",
        // background: "#eeeeee",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 50px 10px",
        }}
      >
        <div>
          <Typography variant="h6">
            <strong>COURSE~ADDA</strong>
          </Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/signup");
              }}
            >
              signup
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/signin");
              }}
            >
              signin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
