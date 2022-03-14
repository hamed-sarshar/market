import React, {useState} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {List, ListItemAvatar, Skeleton} from "@mui/material";
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
    const [loaded, setLoaded] = useState(false);

    const listBuys = useLiveQuery(
        async () => {
            const buy = await db.listCardShops.toArray();
            setLoaded(true);
            return buy;
        }
    )

    const deleteProduct = async (props) => {
        try {
            await db.listCardShops.delete(props.id);
            enqueueSnackbar(`${props.name} از سبدخرید شما حذف شد. `, {variant: "success"});
        }
        catch {
            enqueueSnackbar(`${props.name} از سبدخرید شما حذف نشد. `, {variant: "error"})
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
                        <RemoveShoppingCartIcon fontSize="large" color="action" style={{fontSize: "15rem"}}/>
                    </Typography>
                ) : (
                    <React.Fragment>
                        <Grid container marginBottom={2}>
                            <Grid item xs={6}>
                                {loaded ? (
                                    <Typography variant="subtitle1" sx={{marginBottom: 1}}> جمع خرید‌ها
                                        : {sumListBuys?.toLocaleString()} <Typography variant="caption"> تومان</Typography>
                                    </Typography>
                                ) : (
                                    <Skeleton animation="wave" variant="text" width="40%"/>
                                )}
                            </Grid>
                            <Grid item xs={6} textAlign="left">
                                {loaded ? (
                                    <Button onClick={archiveListBuys} variant="outlined">آرشیو کردن این ماه</Button>
                                ) : (
                                    <Skeleton animation="wave" variant="text" width="40%" style={{float: "left"}}/>
                                )}
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
                                                    {
                                                        loaded ? (
                                                            <img style={{width: "100%", height: "100%", objectFit: 'contain'}}
                                                                 src={productDetail.imgSrc ? productDetail.imgSrc : NoProduct}
                                                                 alt="product"/>
                                                        ) : (
                                                            <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                                        )
                                                    }

                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <React.Fragment>
                                                        {
                                                            loaded ? (
                                                                    <Typography variant="inherit" textAlign="right">
                                                                        {productDetail.name}
                                                                    </Typography>
                                                                )
                                                                : (
                                                                    <Skeleton animation="wave" variant="text" width="85%"/>
                                                                )
                                                        }
                                                    </React.Fragment>
                                                }
                                                secondary={
                                                    loaded ? (
                                                        <React.Fragment>
                                                            <Typography component="span" display="block" textAlign="right" className="IRANSans">
                                                                {getPersianDateTime(productDetail.dateBuy)}
                                                            </Typography>
                                                            <Typography component="span" display="block" textAlign="right">
                                                                {productDetail.price.toLocaleString()} تومان
                                                            </Typography>
                                                        </React.Fragment>
                                                    ) : (
                                                            <React.Fragment>
                                                                <Skeleton animation="wave" width="70%" variant="text"/>
                                                                <Skeleton animation="wave" width="50%" variant="text"/>
                                                            </React.Fragment>
                                                        )

                                                }
                                            />
                                            {
                                                loaded ? (
                                                    <IconButton edge="end" aria-label="delete"
                                                                onClick={() => deleteProduct(productDetail)}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                ) : (
                                                    <Skeleton animation="wave" variant="circular" width={20} height={20} />
                                                )
                                            }
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