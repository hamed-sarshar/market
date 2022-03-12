import React from 'react';
import Container from "@mui/material/Container";
import {Box, Grid} from "@mui/material";
import Product from "./products/Product";
import ProductsList from "../json/ProductsList.json"
import {useSnackbar} from 'notistack';
import {db} from "./utilities/db";

const Home = () => {
    const {enqueueSnackbar} = useSnackbar();

    const handleOpenAddToCard = async (props) => {
        let imgSrc = props.imgSrc;
        let name = props.name;
        let title = props.title;
        let price = props.price;
        let dateBuy = Date.now();
        try {
            await db.listCardShops.add({
                imgSrc, name, title, price, dateBuy
            })
            enqueueSnackbar(`${props.name} به سبد خرید افزوده شد  `, {variant: "success"});

        } catch {
            enqueueSnackbar(`${props.name} به سبد خرید افزوده نشد `, {variant: "error"});
        }
    }

    return (
        <Container maxWidth="xl" sx={{my: 3, pt: 2}}>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={{xs: 2, md: 3}}>
                    {ProductsList.map((productDetail, index) => (
                        <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                            <Product key={index} data={productDetail} index={index} handleOpenAddToCard={handleOpenAddToCard}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Home;