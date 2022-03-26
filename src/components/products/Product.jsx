import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, Box} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import NoProduct from "../../images/product/noProduct.png"

const Product = ({index, data, handleOpenAddToCard}) => {

    return (
        <Card className="boxProduct" key={index} sx={{display: {xs: "flex", sm: "block"}, flex: '1 0 auto'}}>
                <Box sx={{width: {xs: "30%", sm: 'auto'}, display: {xs: 'flex', sm: 'block'}}}>
                    <CardMedia
                        component="img"
                        sx={{height: {xs: 100, sm: 200}, width: '80%', margin: 'auto' , objectFit: 'scale-down', padding:'.5rem'}}
                        image={data.imgSrc ? data.imgSrc : NoProduct}
                        alt={data.name}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' , width: {xs: "70%", sm: 'auto'}}}>
                    <CardContent sx={{padding: {xs: '8px 0', sm: 'auto'}}}>
                        <Typography sx={{height: {xs: "auto", sm: 44 }}} gutterBottom variant="body1" className="ellipsis-2" component="div">
                            {data.name}
                        </Typography>
                        <Typography sx={{height: {xs: "auto", sm: 44 }}} variant="caption" className="ellipsis-2" color="text.secondary">
                            {data.title}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container direction="row" justifyContent="space-around" alignItems="center">
                            <Typography variant="string" className="price" color="text.secondary">
                                {data.price.toLocaleString()}
                                <Typography variant="caption"> تومان</Typography>
                            </Typography>
                            <IconButton onClick={() => handleOpenAddToCard(data)} size="small" color="primary" aria-label="خرید">
                                <AddShoppingCartIcon style={{transform: 'scale(-1, 1)'}}/>
                            </IconButton>
                        </Grid>
                    </CardActions>
                </Box>
        </Card>
    );
}

export default Product;