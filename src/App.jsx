import React from 'react';
import "./css/Style.sass";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { Routes, Route} from "react-router-dom";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Buys from "./components/Buys";
import Archives from "./components/Archives";
import ShowArchive from "./components/ShowArchive";
import Test from "./components/Test"
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import {Zoom, Box, Fab} from "@mui/material";
import PropTypes from "prop-types";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {SnackbarProvider} from "notistack";

function ScrollTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}
ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function App(props) {
    return (
        <div>
            <Routes>
                <Route path="/market/" element={<Home/>}/>
                        <Route path="/market/buys" element={<Buys/>}/>
                        <Route path="/market/archives" element={<Archives/>}/>
                        <Route path="/market/showArchive" element={<ShowArchive/>}/>
                        <Route path="/market/test" element={<Test/>}/>
                        <Route path="/market/notFound" element={<NotFound/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
        </div>
        // <React.Fragment>
        //     <SnackbarProvider maxSnack={2} autoHideDuration={1000}>
        //         <NavBar/>
        //         <span id="back-to-top-anchor"/>
        //             {/* <Routes>
        //                 <Route path="/market/" element={<Home/>}/>
        //                 <Route path="/market/buys" element={<Buys/>}/>
        //                 <Route path="/market/archives" element={<Archives/>}/>
        //                 <Route path="/market/showArchive" element={<ShowArchive/>}/>
        //                 <Route path="/market/test" element={<Test/>}/>
        //                 <Route path="/market/notFound" element={<NotFound/>}/>
        //                 <Route path="*" element={<NotFound/>}/>
        //             </Routes> */}
        //         <Footer/>
        //         <ScrollTop {...props}>
        //             <Fab color="secondary" size="small" aria-label="scroll back to top">
        //                 <KeyboardArrowUpIcon />
        //             </Fab>
        //         </ScrollTop>
        //     </SnackbarProvider>
        // </React.Fragment>
    );
}
