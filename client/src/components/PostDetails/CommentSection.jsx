import React, { useState, useRef } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  IconButton,
} from "@material-ui/core";

import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const [loadingBtn, setLoadingBtn] = useState(false);
  const commentsRef = useRef();

  const handleClick = async () => {
    setLoadingBtn(true);
    setComment("");
    const finalComment = `${user.result.name} : ${comment}`;
    const newComment = await dispatch(commentPost(finalComment, post._id));
    setComments(newComment);
    commentsRef.current.scrollIntoView({ behavior: "smooth" });
    setLoadingBtn(false);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4} className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6" color="initial">
            Comments
          </Typography>
          {comments.map((c, i) => (
            <>
              <Typography
                key={i}
                gutterBottom
                variant="subtitle1"
                color="initial"
              >
                <strong>{c.split(":")[0]}</strong> {c.split(":")[1]}
              </Typography>
            </>
          ))}
          <div ref={commentsRef} />
        </Grid>
        {user?.result?.name ? (
          <Grid item xs={8}>
            <Typography gutterBottom variant="h6" color="initial">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              label="Comment"
              rows={4}
              variant="outlined"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              fullWidth
              disabled={!comment || loadingBtn}
              color="primary"
              onClick={handleClick}
            >
              {loadingBtn ? <CircularProgress size={25} /> : "Comment"}
            </Button>
          </Grid>
        ) : (
          <Grid item xs={8} style={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h6" color="initial">
              Sign in to comment
            </Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default CommentSection;
