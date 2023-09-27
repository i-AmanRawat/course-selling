import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItem: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifycontent: "center",
          width: " 450px",
          height: "300px",
          padding: "20px",
          margin: "auto",
          paddingTop: "70px",
          border: "1.5px solid black",
          borderRadius: "7px",
          aspectRatio: "1",
          // marginTop: "200px",
        }}
      >
        <div>
          <Typography variant="h6">
            Welcome to CourseAdda. Signin below
          </Typography>
        </div>
        <br />
        <div>
          <TextField
            style={{ marginBottom: 15 }}
            required
            label="Username"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            style={{ marginBottom: 15 }}
            required
            label="Password"
            type="password"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            style={{ margin: "auto" }}
            variant="contained"
            onClick={async () => {
              const res = await axios({
                method: "post",
                url: "http://localhost:3000/admin/login",
                headers: {
                  username,
                  password,
                  "Content-Type": "application/json",
                },
              });
              if (res.data) {
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                window.location = "/";
              }
            }}
          >
            SIGN IN
          </Button>
        </div>
      </Box>
    </div>
  );
}
