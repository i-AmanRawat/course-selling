import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [price, setPrice] = useState(0);

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
          width: " 500px",
          height: "400px",
          padding: "20px",
          margin: "auto",
          paddingTop: "50px",
          border: "1.5px solid black",
          borderRadius: "7px",
          aspectRatio: "1",
        }}
      >
        <Typography variant="h5" style={{ marginBottom: 15 }}>
          Course details
        </Typography>
        <TextField
          style={{ marginBottom: 15 }}
          required
          label="Title"
          variant="outlined"
          fullWidth={true}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <TextField
          style={{ marginBottom: 15 }}
          required
          label="Description"
          variant="outlined"
          fullWidth={true}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <TextField
          style={{ marginBottom: 15 }}
          required
          label="Price"
          variant="outlined"
          fullWidth={true}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <TextField
          style={{ marginBottom: 40 }}
          required
          label="Image"
          variant="outlined"
          fullWidth={true}
          onChange={(e) => {
            setImageLink(e.target.value);
          }}
        />

        <Button
          variant="contained"
          onClick={async () => {
            const token = localStorage.getItem("token");
            const res = await axios({
              method: "post",
              url: "http://localhost:3000/admin/courses",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              data: {
                title,
                description,
                imageLink,
                price,
                published: true,
              },
            });
            if (res.data) {
              alert("course added successfully");
              console.log(res.data);
            }
          }}
        >
          ADD COURSE
        </Button>
      </Box>
    </div>
  );
}
