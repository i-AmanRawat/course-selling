import { Box, Typography } from "@mui/material";

export default function CourseCard({ course }) {
  const { title, description, price, imageLink } = course;
  return (
    <Box
      style={{
        display: "flex",
        marginTop: 200,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        style={{
          margin: 10,
          width: 300,
          minHeight: 200,
          padding: "30px 20px 30px",
          borderRadius: 15,
          border: "1.5px solid gray",
          zIndex: 2,
          backgroundColor: "white",
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
      </Box>
    </Box>
  );
}
