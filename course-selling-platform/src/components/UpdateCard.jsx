import { useState } from "react";
import { Typography, TextField, Card, Button } from "@mui/material";
import axios from "axios";

export default function UpdateCard({ course, setCourse }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.imageLink);
  const [price, setPrice] = useState(course.price);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
        <div style={{ padding: "40px 20px 40px" }}>
          <Typography variant="h5" style={{ marginBottom: 20 }}>
            Update course details
          </Typography>
          <TextField
            value={title}
            style={{ marginBottom: 15 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            value={description}
            style={{ marginBottom: 15 }}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            value={image}
            style={{ marginBottom: 15 }}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />
          <TextField
            value={price}
            style={{ marginBottom: 40 }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />

          <Button
            variant="contained"
            onClick={async () => {
              const token = localStorage.getItem("token");
              axios({
                url: "http://localhost:3000/admin/courses/" + course._id,
                method: "put",
                headers: {
                  "Content-type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                data: {
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                  price,
                },
              });

              let updatedCourse = {
                _id: course._id,
                title: title,
                description: description,
                imageLink: image,
                price,
              };
              setCourse(updatedCourse);
            }}
          >
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}
