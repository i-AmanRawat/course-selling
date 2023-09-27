import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

export default function Signup() {
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
        }}
      >
        <div>
          <Typography variant="h6">
            Welcome to CourseAdda. Signup below
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
            variant="contained"
            onClick={async () => {
              try {
                const res = await axios({
                  method: "post",
                  url: "http://localhost:3000/admin/signup",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  data: { username, password },
                });
                console.log(res.data);
              } catch (error) {
                console.log(error.response.data);
              }
            }}
          >
            SIGN UP
          </Button>
        </div>
      </Box>
    </div>
  );
}
