import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import p1 from "../../assets/graph.png";
import p2 from "../../assets/report.png";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const AnalyticsHomepage = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      title: "View Trends",
      image: p1,
    },
    {
      id: 2,
      title: "Get Reports",
      image: p2,
    },
  ];

  const handleCategoryClick = (categoryTitle) => {
    console.log(`Clicked on category: ${categoryTitle}`);
    if (categoryTitle === "View Trends") {
      navigate("/trends");
    } else if (categoryTitle === "Get Reports") {
      navigate("/reports");
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          style={{
            paddingTop: "5%",
            fontWeight: "100",
            fontSize: "2rem",
            textAlign: "center",
          }}
        >
          What would you like to do today?
        </Typography>
        <Grid
          container
          spacing={3}
          style={{ paddingTop: "10%", paddingBottom: "5%" }}
        >
          {categories.map((category) => (
            <Grid item xs={12} md={6} key={category.id}>
              <Card style={{ boxShadow: "none" }}>
                <CardActionArea
                  onClick={() => handleCategoryClick(category.title)}
                >
                  <CardMedia
                    component="img"
                    height="200px"
                    width="auto"
                    image={category.image}
                    alt={category.title}
                    style={{ objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography
                      style={{ fontWeight: "100", fontSize: "1.2rem" }}
                      component="div"
                      align="center"
                    >
                      {category.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AnalyticsHomepage;
