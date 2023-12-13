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
import p1 from "../../assets/addGroupExpense.png";
import p2 from "../../assets/groupHistory.png";
import p3 from "../../assets/groupDashboard.png";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const GroupExpenseHomepage = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      title: "Add Group Expense",
      image: p1,
    },
    {
      id: 2,
      title: "Group History",
      image: p2,
    },
    {
      id: 3,
      title: "Group Expense Dashboard",
      image: p3,
    },
  ];

  const handleCategoryClick = (categoryTitle) => {
    console.log(`Clicked on category: ${categoryTitle}`);
    if (categoryTitle === "Add Group Expense") {
      navigate("/groupTransaction");
    } else if (categoryTitle === "Group History") {
      navigate("/groupHistory");
    } else if (categoryTitle === "Group Expense Dashboard") {
      navigate("/groupExpenseDashboard");
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
            <Grid item xs={12} md={4} key={category.id}>
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

export default GroupExpenseHomepage;
