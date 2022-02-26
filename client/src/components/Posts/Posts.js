import React from "react";
import { Grid, CircularProgress, Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  if (posts.length === 0) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          No posts yet.
        </Typography>
      </Paper>
    );
  }

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
