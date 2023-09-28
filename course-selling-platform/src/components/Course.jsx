import axios from "axios";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import { Loading } from "./Loading";
import UpdateCard from "./UpdateCard";
import CourseCard from "./CourseCard";
import { courseState } from "../store/atoms/course";
import { courseTitle, isCourseLoading } from "../store/selectors/course";

export default function Course() {
  const { courseId } = useParams();
  // const [course, setCourse] = useState(null);
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);

  async function init() {
    const token = localStorage.getItem("token");
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:3000/admin/course/" + courseId,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setCourse({ isLoading: false, course: res.data.course });
      } else {
        setCourse({ isLoading: false, course: null });
      }
    } catch (error) {
      setCourse({ isLoading: false, course: null });
    }
  }

  useEffect(() => {
    init();
  }, []);

  if (courseLoading) {
    return <Loading />;
  }
  return (
    <div>
      <GrayTopper />
      <Grid container style={{ marginLeft: 50, marginRight: 50 }}>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);

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
