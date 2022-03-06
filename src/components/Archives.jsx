import React from 'react';
import Container from "@mui/material/Container";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "./utilities/db";
import Typography from "@mui/material/Typography";
import ArchiveIcon from '@mui/icons-material/Archive';
import Grid from "@mui/material/Grid";
import {List} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {getPersianDateTime} from "../utils/DateTimeUtils";


const Archives = () => {

    const listArchives = useLiveQuery(
        async () => {
            return await db.archiveListCardShops.toArray();
        }
    )

    console.log("listArchives :", listArchives);

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
                                    <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                                        <ListItem
                                            sx={{border: 1, borderRadius: 1, borderColor: '#cdcdcd'}}
                                        >
                                            <ListItemText
                                                primary={
                                                    <React.Fragment>
                                                        <Typography variant="inherit" textAlign="right" className="IRANSans" sx={{marginBottom: 1}}>
                                                            تاریخ آرشیو : {getPersianDateTime(listArchive.archiveDate)}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                                secondary={
                                                    <React.Fragment>
                                                                <Typography component="span" display="block" textAlign="right">قیمت کل
                                                                    : {listArchive.totalAmount.toLocaleString()} تومان</Typography>
                                                                <Typography component="span" display="block" textAlign="right">تعداد محصولات : {listArchive.count}</Typography>
                                                    </React.Fragment>
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

export default Archives;