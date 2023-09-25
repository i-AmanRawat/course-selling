import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
      });
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        padding: "60px 30px 60px 30px",
      }}
    >
      {courses.map((course) => {
        return <Course key={course._id} course={course} />;
      })}
    </Box>
  );
}

function Course({ course }) {
  const navigate = useNavigate();
  const { _id, title, description, price, imageLink } = course;

  return (
    <Box
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
        borderRadius: 10,
        border: "1.5px solid gray",
        marginBottom: 20,
      }}
    >
      <img src={imageLink} style={{ width: 300 }}></img>
      <Typography textAlign={"left"} variant="h5">
        <strong> {title}</strong>
      </Typography>
      <Typography textAlign={"left"} variant="subtitle1">
        {description}
      </Typography>

      <Typography variant="subtitle1">
        <b>Rs {price} </b>
      </Typography>
      <div style={{ display: "flex", justifyContent: "left", marginTop: 15 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/course/" + _id);
          }}
        >
          Edit
        </Button>
      </div>
    </Box>
  );
}
