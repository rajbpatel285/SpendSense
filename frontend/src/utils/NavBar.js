import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import logo from "../assets/logoWhite.png";
import { isTokenValid } from "../views/Login/auth";

const drawerWidth = 240;

export default function NavBar(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const location = useLocation();
  const isValidToken = isTokenValid();

  let navItems = [];
  if (isValidToken) {
    navItems = ["Home", "Contact", "FAQ", "Pricing", "Logout"];
  } else {
    navItems = ["Contact", "FAQ", "Pricing", "Login"];
  }
  console.log(navItems);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavigation = (value) => {
    if (value === "Home") {
      navigate("/homepage");
    } else if (value === "Contact") {
      navigate("/contact");
    } else if (value === "FAQ") {
      navigate("/faq");
    } else if (value === "Pricing") {
      navigate("/pricing");
    } else if (value === "Logout" || value === "Login") {
      sessionStorage.clear();
      navigate("/");
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SPENDSENSE
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => {
                handleNavigation(item);
              }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          style={{
            backgroundColor: "#262626",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                pt: 1,
              }}
            >
              <img
                src={logo}
                alt=""
                width={150}
                onClick={() => {
                  navigate("/homepage");
                }}
                style={{ cursor: "pointer" }}
              />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{ color: "#fff" }}
                  onClick={() => {
                    handleNavigation(item);
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            // p: 1,
            width: "100%",
            minHeight: "100vH",
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
