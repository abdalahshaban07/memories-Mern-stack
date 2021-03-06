import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltIconOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import useStyles from "./styles";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
  const { t } = useTranslation();

  const deletePostHandle = () => {
    dispatch(deletePost(post._id));
  };

  const userId = user?.result?.googleId || user?.result?._id;

  const hasLiked = post.likes.find((like) => like === userId);

  const likePostHandle = async () => {
    dispatch(likePost(post._id));
    if (hasLiked) {
      setLikes(likes.filter((like) => like !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  const openPost = () => navigate(`/posts/${post._id}`);

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" /> &nbsp;{" "}
          {likes.length > 2
            ? `${t("you")}${likes.length - 1} ${t("others")}`
            : `${likes.length} ${t("like")} ${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltIconOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? t("like") : t("likes")}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltIconOutlined fontSize="small" /> &nbsp;{t("like")}
      </>
    );
  };
  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
        onClick={openPost}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          <Moment fromNow>{post.createdAt}</Moment>
        </Typography>
      </div>
      {(user?.result?.googleId === post?.creator ||
        user?.result?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => likePostHandle()}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => deletePostHandle()}
          >
            <DeleteIcon fontSize="small" />
            {t("delete")}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
