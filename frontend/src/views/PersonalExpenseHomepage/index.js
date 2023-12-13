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
import p1 from "../../assets/addPersonalExpense.png";
import p2 from "../../assets/expenseHistory.png";
import p3 from "../../assets/calenderView.png";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const PersonalExpenseHomepage = () => {
  const navigate = useNavigate();
  const categories = [
    {
      id: 1,
      title: "Add Personal Expense",
      image: p1,
    },
    {
      id: 2,
      title: "Transaction History",
      image: p2,
    },
    {
      id: 3,
      title: "Calender",
      image: p3,
    },
  ];

  const handleCategoryClick = (categoryTitle) => {
    console.log(`Clicked on category: ${categoryTitle}`);
    if (categoryTitle === "Add Personal Expense") {
      navigate("/addTransaction");
    } else if (categoryTitle === "Transaction History") {
      navigate("/personal");
    } else if (categoryTitle === "Calender") {
      navigate("/calender");
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

export default PersonalExpenseHomepage;
