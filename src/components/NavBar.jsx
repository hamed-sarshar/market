import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import HomeIcon from '@mui/icons-material/Home';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from "@mui/material/Paper";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const NavBar = () => {
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <AppBar sx={{ position: { xs: "relative", md: "sticky" } }}>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            <Typography sx={{ mx: 2, display: { xs: "none", md: "flex" }}}>
              <Link to="/market/" style={{ display: "flex" }}>
                <img src={Logo} alt="بوفه گلریز" />
              </Link>
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
              }}
            >
              <Link to="/market/" style={{ display: "flex" }}>
                <img src={Logo} alt="بوفه گلریز" />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                component={Link}
                to="/market/"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                صفحه اصلی
              </Button>
              <Button
                component={Link}
                to="/market/buys"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                خرید شده
              </Button>
              <Button
                component={Link}
                to="/market/archives"
                sx={{ my: 2, color: "white", display: "block" }}
              >
                آرشیو شده
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9, display: { xs: "flex", md: "none"}, justifyContent: "center"}}
        elevation={3}
      >
        <BottomNavigation
          sx={{ width: 500 }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            component={Link}
            to="/market/buys"
            label="سبدخرید"
            value="buys"
            icon={<LocalGroceryStoreIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/market/"
            label="صفحه اصلی"
            value="home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/market/archives"
            label="آرشیو"
            value="Archive"
            icon={<ArchiveIcon />}
          />
          
        </BottomNavigation>
      </Paper>
    </React.Fragment>
  );
};

export default NavBar;
