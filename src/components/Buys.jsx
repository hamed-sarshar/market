import React from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {List, ListItemAvatar} from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import NoProduct from "../images/product/noproduct.png";
import {useSnackbar} from "notistack";
import {getPersianDateTime} from "../utils/DateTimeUtils";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "./utilities/db";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import Button from "@mui/material/Button";

const Buys = () => {
    const {enqueueSnackbar} = useSnackbar();
    console.log("test");
    const listBuys = useLiveQuery(
        async () => {
            return await db.listCardShops.toArray();
        }
    )

    const deleteProduct = async (props) => {
        try {
            await db.listCardShops.delete(props.id);
            enqueueSnackbar(`${props.name} با قیمت ${props.price.toLocaleString()} تومان از سبدخرید شما حذف شد.`, {variant: "success"});
        }
        catch {
            enqueueSnackbar(`${props.name} با قیمت ${props.price.toLocaleString()} تومان از سبدخرید شما حذف نشد.`, {variant: "error"})
        }
    }

    const archiveListBuys = async () => {
        try {
            let dateArchive = Date.now();
            let count = listBuys.length;
            let totalAmount = sumListBuys;
            let archiveDate = dateArchive;
            await db.archiveListCardShops.add({
                totalAmount, archiveDate, count, listBuys
            })
            await db.listCardShops.clear();
            enqueueSnackbar("با موفقیت به آرشیو اضافه شد", {variant: "success"})
        } catch {
            enqueueSnackbar("خطا در بارگذاری آرشیو", {variant: "error"})
        }
    }

    let sumListBuys = listBuys?.reduce(function (prev, current) {
        return prev + +current.price
    }, 0);


    return (
        <Container maxWidth="xl" sx={{my: 3, pt: 2}}>
            {
                listBuys?.length === 0 ? (
                    <Typography component="div" textAlign="center">
                        <Typography variant="h5" sx={{marginBottom: 1}}>در سبد خرید شما هیچ محصولی برای نمایش وجود
                            ندارد.</Typography>
                        <RemoveShoppingCartIcon fontSize="large" color="action" style={{fontSize: "20rem"}}/>
                    </Typography>
                ) : (
                    <React.Fragment>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" sx={{marginBottom: 1}}> جمع خرید‌ها
                                    : {sumListBuys?.toLocaleString()} <Typography variant="caption"> تومان</Typography>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} textAlign="left">
                                <Button onClick={archiveListBuys} variant="outlined">آرشیو کردن این ماه</Button>
                            </Grid>
                        </Grid>
                        <List>
                            <Grid container spacing={{xs: 2, md: 3}}>
                                {listBuys?.map((productDetail, index) => (
                                    <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                                        <ListItem
                                            sx={{border: 1, borderRadius: 1, borderColor: '#cdcdcd'}}
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <img style={{width: "100%", height: "100%", objectFit: 'contain'}}
                                                         src={productDetail.imgSrc ? productDetail.imgSrc : NoProduct}
                                                         alt="product"/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <React.Fragment>
                                                        <Typography variant="inherit" textAlign="right">
                                                            {productDetail.name}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography component="span" display="block" textAlign="right" className="IRANSans">
                                                            {getPersianDateTime(productDetail.dateBuy)}
                                                        </Typography>
                                                        <Typography component="span" display="block" textAlign="right">
                                                            {productDetail.price.toLocaleString()} تومان
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                            <IconButton edge="end" aria-label="delete"
                                                        onClick={() => deleteProduct(productDetail)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItem>
                                    </Grid>
                                ))}
                            </Grid>
                        </List>
                    </React.Fragment>

                )
            }
        </Container>
    );
};

export default Buys;