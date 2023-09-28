import { useState } from "react";
import { Typography, TextField, Card, Button } from "@mui/material";
import axios from "axios";
import { useRecoilState } from "recoil";
import { courseState } from "../store/atoms/course";

export default function UpdateCard() {
  const [courseDetail, setCourse] = useRecoilState(courseState);

  const [title, setTitle] = useState(courseDetail.course.title);
  const [description, setDescription] = useState(
    courseDetail.course.description
  );
  const [image, setImage] = useState(courseDetail.course.imageLink);
  const [price, setPrice] = useState(courseDetail.course.price);

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
              await axios({
                url:
                  "http://localhost:3000/admin/courses/" +
                  courseDetail.course._id,
                method: "put",
                headers: {
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
                _id: courseDetail.course._id,
                title: title,
                description: description,
                imageLink: image,
                price,
              };
              setCourse({ isLoading: false, course: updatedCourse });
            }}
          >
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}
