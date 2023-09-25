import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import UpdateCard from "./UpdateCard";
import CourseCard from "./CourseCard";

export default function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/admin/course/" + courseId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.course);
        setCourse(data.course);
      });
  }, []);

  if (!course) {
    return <Box>Loading</Box>;
  }
  return (
    <div>
      <GrayTopper title={course.title} />
      <Grid container style={{ marginLeft: 50, marginRight: 50 }}>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard course={course} />
        </Grid>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard course={course} setCourse={setCourse} />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper({ title }) {
  return (
    <div
      style={{
        height: 250,
        background: "#212121",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}
