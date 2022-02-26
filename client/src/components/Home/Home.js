import React, { useEffect, useState } from "react";
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.mainContainer}
        >
          <Grid item xs={12} sm={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper className={classes.pagination} elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
