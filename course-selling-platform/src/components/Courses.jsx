import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loading } from "./Loading";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  async function init() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:3000/admin/courses",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data) {
        setCourses(res.data.courses);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  }

  useEffect(() => {
    init();
  }, []);

  if (!courses) {
    return <Loading />;
  }

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
