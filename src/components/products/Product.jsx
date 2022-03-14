import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import NoProduct from "../../images/product/noproduct.png"
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => ({
    price: {
        fontWeight: 'bolder'
    },   
}))

const Product = ({index, data, handleOpenAddToCard}) => {
    const classes = useStyles();

    return (
        <Card key={index}>
                <CardMedia
                    component="img"
                    sx={{height: 220, margin: 'auto', width: '85%', objectFit: 'scale-down', padding:'.5rem'}}
                    image={data.imgSrc ? data.imgSrc : NoProduct}
                    alt={data.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="subtitle2" className="ellipsis-1" component="div">
                        {data.name}
                    </Typography>
                    <Typography variant="caption" className="ellipsis-2 areaDescription" color="text.secondary">
                        {data.title}
                    </Typography>
                </CardContent>
            <CardActions>
                <Grid container direction="row" justifyContent="space-around" alignItems="center" >
                    <IconButton onClick={() => handleOpenAddToCard(data)} size="small" color="primary" aria-label="خرید">
                        <AddShoppingCartIcon style={{transform: 'scale(-1, 1)'}}/>
                    </IconButton>
                    <Typography variant="string" className="price" color="text.secondary">
                        {data.price.toLocaleString()}
                        <Typography variant="caption"> تومان</Typography>
                    </Typography>
                </Grid>
            </CardActions>
        </Card>
    );
}

export default Product;