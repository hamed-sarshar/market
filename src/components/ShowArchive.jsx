import React, {useState} from 'react';
import Typography from "@mui/material/Typography";
import {useParams} from 'react-router-dom';
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "./utilities/db";
import ArchiveIcon from '@mui/icons-material/Archive';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {List, ListItemAvatar, Skeleton} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import NoProduct from "../images/product/noproduct.png";
import ListItemText from "@mui/material/ListItemText";
import {getPersianDateTime} from "../utils/DateTimeUtils";
import Container from "@mui/material/Container";

const ShowArchive = () => {
    const [loaded, setLoaded] = useState(false);
    const {idArchive} = useParams();

    const listArchive = useLiveQuery(
        async () => {
            const archive = await db.archiveListCardShops.where({id: parseInt(idArchive)}).first();
            setLoaded(true);
            return archive;
        }
    );

    console.log(listArchive);

    return (
        <Container maxWidth="xl" sx={{mt: 1, mb: 3, pt: 2}}>
            {
                listArchive === null ? (
                    <Typography component="div" textAlign="center">
                        <Typography variant="h5" sx={{marginBottom: 1}}>آرشیوی برای نمایش وجود ندارد </Typography>
                        <ArchiveIcon fontSize="large" color="action" style={{fontSize: "20rem"}}/>
                    </Typography>
                ) : (
                    <React.Fragment>
                        <List>
                            <Grid container spacing={{xs: 2, md: 3}}>
                                <Grid item xs={12} sm={4}>
                                    <ListItem sx={{border: 1, borderRadius: 1, borderColor: '#cdcdcd'}}>
                                        {loaded ? (
                                            <Typography variant="subtitle1" sx={{textAlign: 'center'}}>
                                                تاریخ آرشیو
                                                : {listArchive?.archiveDate ? getPersianDateTime(listArchive?.archiveDate) : ""}
                                            </Typography>
                                        ) : (
                                            <Skeleton animation="wave" variant="text" width="100%"/>
                                        )}
                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <ListItem sx={{border: 1, borderRadius: 1, borderColor: '#cdcdcd'}}>
                                        {loaded ? (
                                            <Typography variant="subtitle1" sx={{textAlign: 'center'}}>
                                                تعداد محصولات : {listArchive?.count}
                                            </Typography>
                                        ) : (
                                            <Skeleton animation="wave" variant="text" width="100%"/>
                                        )}
                                    </ListItem>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <ListItem sx={{border: 1, borderRadius: 1, borderColor: '#cdcdcd'}}>
                                        {loaded ? (
                                            <Typography variant="subtitle1" sx={{textAlign: 'center'}}>
                                                جمع کل : {listArchive?.totalAmount.toLocaleString()} تومان
                                            </Typography>
                                        ) : (
                                            <Skeleton animation="wave" variant="text" width="100%"/>
                                        )}
                                    </ListItem>
                                </Grid>
                            </Grid>
                        </List>
                        <List>
                            <Grid container spacing={{xs: 2, md: 3}}>
                                {listArchive?.listBuys.map((productDetail, index) => (
                                    <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                                        <ListItem
                                            sx={{border: 1, borderRadius: 1, borderColor: '#cdcdcd'}}
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {
                                                        loaded ? (
                                                            <img style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: 'contain'
                                                            }}
                                                                 src={productDetail.imgSrc ? productDetail.imgSrc : NoProduct}
                                                                 alt="product"/>
                                                        ) : (
                                                            <Skeleton animation="wave" variant="circular" width={40}
                                                                      height={40}/>
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
                                                                    <Skeleton animation="wave" variant="text" width="95%"/>
                                                                )
                                                        }
                                                    </React.Fragment>
                                                }
                                                secondary={
                                                    loaded ? (
                                                        <React.Fragment>
                                                            <Typography component="span" display="block"
                                                                        textAlign="right"
                                                                        className="IRANSans">
                                                                {getPersianDateTime(productDetail.dateBuy)}
                                                            </Typography>
                                                            <Typography component="span" display="block"
                                                                        textAlign="right">
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

export default ShowArchive;
