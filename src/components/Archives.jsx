import React, {useState} from 'react';
import Container from "@mui/material/Container";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "./utilities/db";
import Typography from "@mui/material/Typography";
import ArchiveIcon from '@mui/icons-material/Archive';
import Grid from "@mui/material/Grid";
import {List, ListItemButton, Skeleton} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import {getPersianDateTime} from "../utils/DateTimeUtils";

const Archives = () => {
    const [loaded, setLoaded] = useState(false);

    const listArchives = useLiveQuery(
        async () => {
            const archiveList = await db.archiveListCardShops.toArray();
            setLoaded(true);
            return archiveList;
        }
    )

    const showDataArchive = (props) => {
        window.open(`/showArchive/${props.id}`, "_self");
    }

    return (
        <Container maxWidth="xl" sx={{my: 3, pt: 2}}>
            {
                listArchives?.length === 0 ? (
                    <Typography component="div" textAlign="center">
                        <Typography variant="h5" sx={{marginBottom: 1}}>آرشیوی برای نمایش وجود ندارد.</Typography>
                        <ArchiveIcon fontSize="large" color="action" style={{fontSize: "20rem"}}/>
                    </Typography>
                ) : (
                    <React.Fragment>
                        <List>
                            <Grid container rowSpacing={1} spacing={{xs: 2, md: 3}}>
                                {listArchives?.map((listArchive, index) => (
                                    <Grid onClick={loaded ? (() => showDataArchive(listArchive)) : null} item xs={12} sm={6} md={4} xl={3} key={index}>
                                        <ListItemButton sx={{border: 1, borderRadius: 1, borderColor: '#cdcdcd'}}>
                                            <ListItemText primary={
                                                loaded ? (
                                                        <React.Fragment>
                                                            <Typography variant="inherit" textAlign="right" className="IRANSans" sx={{marginBottom: 1}}>
                                                                تاریخ آرشیو : {getPersianDateTime(listArchive.archiveDate)}
                                                            </Typography>
                                                        </React.Fragment>
                                                    ) : (
                                                        <Skeleton animation="wave" variant="text" sx={{marginBottom: 1}}/>
                                                    )
                                                }
                                                secondary={
                                                    loaded ? (
                                                        <React.Fragment>
                                                            <Typography component="span" display="block" textAlign="right">
                                                                قیمت کل: {listArchive.totalAmount.toLocaleString()} تومان</Typography>
                                                            <Typography component="span" display="block" textAlign="right">
                                                                تعداد محصولات: {listArchive.count}</Typography>
                                                        </React.Fragment>
                                                    ) : (
                                                        <React.Fragment>
                                                            <Skeleton animation="wave" sx={{minHeight: "24px"}} variant="text"/>
                                                            <Skeleton animation="wave" sx={{minHeight: "24px"}} variant="text"/>
                                                        </React.Fragment>
                                                    )
                                                }
                                            />
                                        </ListItemButton>
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

export default Archives;