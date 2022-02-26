import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Grid,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import useStyles from "./styles";
import { getPost } from "../../actions/posts";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  const recommendedPosts = posts.filter(({ _id }) => _id !== id);
  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );

  if (!post && !isLoading) return null;

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography
            variant="h3"
            component="h2"
            style={{ wordBreak: "break-all" }}
          >
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Realtime Chat - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <strong>Comments - coming soon!</strong>
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, name, message, likes, selectedFile, _id }) => (
                <Grid
                  className={classes.container}
                  container
                  alignItems="stretch"
                  spacing={3}
                  key={_id}
                >
                  <Grid item>
                    <div
                      style={{ margin: "20px", cursor: "pointer" }}
                      onClick={() => openPost(_id)}
                      key={_id}
                    >
                      <Typography gutterBottom variant="h6">
                        {title}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {name}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {message}
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        Likes: {likes.length}
                      </Typography>
                      <img
                        className={classes.recommendedImg}
                        src={selectedFile}
                      />
                    </div>
                  </Grid>
                </Grid>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
