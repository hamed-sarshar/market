import React, { useState } from "react";
import Container from "@mui/material/Container";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./utilities/db";
import Typography from "@mui/material/Typography";
import ArchiveIcon from "@mui/icons-material/Archive";
import Grid from "@mui/material/Grid";
import { List, ListItem, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import { getPersianDateTime } from "../utils/DateTimeUtils";
import {useSnackbar} from "notistack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@mui/material';

const Archives = () => {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState("");
  const {enqueueSnackbar} = useSnackbar();

  const listArchives = useLiveQuery(async () => {
    const archiveList = await db.archiveListCardShops.toArray();
    setLoaded(true);
    return archiveList;
  });

  const dialogOpen = (props) => {
      setData(props);
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteArchive = async (data) => {
    try {
        await db.archiveListCardShops.delete(data.id);
        enqueueSnackbar(`آرشیو ${data?.archiveDate ? getPersianDateTime(data?.archiveDate) : ""} .حذف شد`, {variant: "success"});
        setOpen(false);
    }
    catch {
        enqueueSnackbar(`خطا در آرشیو حذف ${data?.archiveDate ? getPersianDateTime(data?.archiveDate) : ""}`, {variant: "error"});
        setOpen(false);
    }

  };

  return (
    <React.Fragment>
      <Container maxWidth="xl" sx={{my: 3, pt: 2, pb: 6}}>
        {listArchives?.length === 0 ? (
          <Typography component="div" textAlign="center">
            <Typography variant="h5" sx={{ marginBottom: 1 }}>
              آرشیوی برای نمایش وجود ندارد.
            </Typography>
            <ArchiveIcon
              fontSize="large"
              color="action"
              style={{ fontSize: "15rem" }}
            />
          </Typography>
        ) : (
          <React.Fragment>
            <List>
              <Grid container rowSpacing={1} spacing={{ xs: 2, md: 3 }}>
                {listArchives?.map((listArchive, index) => (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                    {loaded ? (
                      <ListItem
                        sx={{
                          border: 1,
                          borderRadius: 1,
                          borderColor: "#cdcdcd",
                        }}
                      >
                        <ListItemText
                          primary={
                            <React.Fragment>
                              <Typography
                                variant="inherit"
                                textAlign="right"
                                className="IRANSans"
                                sx={{ marginBottom: 1 }}
                              >
                                تاریخ آرشیو :{" "}
                                {getPersianDateTime(listArchive.archiveDate)}
                              </Typography>
                            </React.Fragment>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                sx={{ display: "block", textAlign: "right" }}
                              >
                                قیمت کل:{" "}
                                {listArchive.totalAmount.toLocaleString()} تومان
                              </Typography>
                              <Typography
                                component="span"
                                sx={{ display: "block", textAlign: "right" }}
                              >
                                تعداد محصولات: {listArchive.count}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                        {loaded ? (
                          <React.Fragment>
                            <IconButton
                              component={Link}
                              to={`/market/showArchive/${listArchive.id}`}
                              edge="end"
                              aria-label="delete"
                            >
                              <VisibilityIcon />
                            </IconButton>
                            <IconButton
                              edge="start"
                              aria-label="delete"
                              onClick={() => dialogOpen(listArchive)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <Skeleton
                              animation="wave"
                              variant="circular"
                              width={20}
                              height={20}
                            />
                            <Skeleton
                              animation="wave"
                              variant="circular"
                              width={20}
                              height={20}
                            />
                          </React.Fragment>
                        )}
                      </ListItem>
                    ) : (
                      <ListItem
                        sx={{
                          border: 1,
                          borderRadius: 1,
                          borderColor: "#cdcdcd",
                        }}
                      >
                        <ListItemText
                          primary={
                            <Skeleton
                              animation="wave"
                              variant="text"
                              sx={{ marginBottom: 1 }}
                            />
                          }
                          secondary={
                            <React.Fragment>
                              <Skeleton
                                animation="wave"
                                sx={{ minHeight: "24px" }}
                                variant="text"
                              />
                              <Skeleton
                                animation="wave"
                                sx={{ minHeight: "24px" }}
                                variant="text"
                              />
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    )}
                  </Grid>
                ))}
              </Grid>
            </List>
          </React.Fragment>
        )}
      </Container>
      <Dialog
        open={open}
        data={data}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          آرشیو {data?.archiveDate ? getPersianDateTime(data?.archiveDate) : ""} حذف شود؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography component="span" sx={{display: 'block'}}>قیمت کل : {data.totalAmount?.toLocaleString()} تومان</Typography>
            <Typography component="span" sx={{display: 'block'}}>تعداد محصولات : {data.count} عدد</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>خیر</Button>
          <Button onClick={()=> deleteArchive(data)} autoFocus>
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Archives;
