import React from 'react';
import {styled} from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import LogoUser from '../images/user.png';
import {Link} from "react-router-dom";
import Logo from "../images/logo.png";
import LogoMobile from "../images/logo-mobile.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Inventory2Icon from '@mui/icons-material/Inventory2';


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
})(({theme, open}) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
    })
}));

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
}));

const NavBar = () => {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <AppBar position="sticky" open={open}>
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <Typography sx={{mx: 2, display: {xs: 'none', md: 'flex'}}}>
                        <Link to="/market" style={{display: "flex"}}><img src={Logo} alt="بوفه گلریز"/></Link>
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleDrawerOpen}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Drawer
                            variant="temporary"
                            transitionDuration={400}
                            sx={{width: 'auto', flexShrink: 0, "& .MuiDrawer-paper": {width: 'auto'}}}
                            anchor="right"
                            open={open}
                        >
                            <DrawerHeader>
                                <IconButton onClick={handleDrawerClose}>
                                    <ChevronRightIcon/>
                                </IconButton>
                            </DrawerHeader>
                            <Divider/>
                            <List onClick={handleDrawerClose}>
                                <ListItem component={Link} to="/market" style={{display: "block", textAlign: "center"}}>
                                    <img src={LogoMobile} alt="بوفه گلریز"/>
                                </ListItem>
                                <ListItem component={Link} to="/market" sx={{color: 'inherit', display: 'flexGrow'}}>
                                    <ListItemIcon sx={{minWidth: 40}}>
                                        <StoreIcon/>
                                    </ListItemIcon>
                                    <ListItemText sx={{textAlign: 'right'}} primary="صفحه اصلی"/>
                                </ListItem>
                                <ListItem component={Link} to="/market/buys" sx={{color: 'inherit', display: 'flexGrow'}}>
                                    <ListItemIcon sx={{minWidth: 40}}>
                                        <ShoppingBasketIcon/>
                                    </ListItemIcon>
                                    <ListItemText sx={{textAlign: 'right'}} primary="خرید شده"/>
                                </ListItem>
                                <ListItem component={Link} to="/market/archives" sx={{color: 'inherit', display: 'flexGrow'}}>
                                    <ListItemIcon sx={{minWidth: 40}}>
                                        <Inventory2Icon/>
                                    </ListItemIcon>
                                    <ListItemText sx={{textAlign: 'right'}} primary="آرشیو شده"/>
                                </ListItem>

                            </List>
                        </Drawer>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        <Button component={Link} to="/market" sx={{my: 2, color: 'white', display: 'block'}}>
                            صفحه اصلی
                        </Button>
                        <Button component={Link} to="/market/buys" sx={{my: 2, color: 'white', display: 'block'}}>
                            خرید شده
                        </Button>
                        <Button component={Link} to="/market/archives" sx={{my: 2, color: 'white', display: 'block'}}>
                            آرشیو شده
                        </Button>
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title="Hamed Sarshar">
                            <IconButton sx={{p: 0}}>
                                <Avatar alt="Hamed Sarshar" src={LogoUser}/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;