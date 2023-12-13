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
import p1 from "../../assets/LandingPage/personal.jpg";
import p2 from "../../assets/LandingPage/group.jpg";
import p3 from "../../assets/LandingPage/report.jpg";
import p4 from "../../assets/LandingPage/profile.jpg";
import banner from "../../assets/LandingPage/banner.png";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const HomePage = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      title: "Personal Expenses",
      image: p1,
    },
    {
      id: 2,
      title: "Shared Expenses",
      image: p2,
    },
    {
      id: 3,
      title: "Reports and Analytics",
      image: p3,
    },
    {
      id: 4,
      title: "Personal Profile",
      image: p4,
    },
  ];

  const handleCategoryClick = (categoryTitle) => {
    console.log(`Clicked on category: ${categoryTitle}`);
    if (categoryTitle === "Personal Expenses") {
      navigate("/personalExpenseHomepage");
    } else if (categoryTitle === "Shared Expenses") {
      navigate("/groupexpensehomepage");
    } else if (categoryTitle === "Reports and Analytics") {
      navigate("/analyticsHomepage");
    } else if (categoryTitle === "Personal Profile") {
      navigate("/profile");
    }
  };

  return (
    <>
      <div name="banner" className="banner-container">
        <img
          src={banner}
          alt="Banner"
          className="banner-image"
          style={{ width: "100%", marginBottom: "5%" }}
        />

        <Container maxWidth="lg">
          <Typography
            style={{ fontWeight: "100", fontSize: "2rem", textAlign: "center" }}
          >
            Let's get started
          </Typography>
          <Grid
            container
            spacing={3}
            style={{ paddingTop: "5%", paddingBottom: "5%" }}
          >
            {categories.map((category) => (
              <Grid item xs={12} md={3} key={category.id}>
                <Card style={{ boxShadow: "none" }}>
                  <CardActionArea
                    onClick={() => handleCategoryClick(category.title)}
                  >
                    <CardMedia
                      component="img"
                      height="auto"
                      image={category.image}
                      alt={category.title}
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
      </div>
    </>
  );
};

export default HomePage;
