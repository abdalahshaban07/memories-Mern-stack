import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { creatPost, updatePost } from "../../actions/posts";
import ChipInput from "material-ui-chip-input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((post) => post._id === currentId) : null
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    if (currentId) {
      await dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      await dispatch(
        creatPost({ ...postData, name: user?.result?.name }, navigate)
      );
    }
    setLoadingBtn(false);
    clear();
  };

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };
  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: null,
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          {t("please_sign_in")}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `${t("edit")} "${post?.title}"` : t("create_memory")}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label={t("title")}
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label={t("message")}
          fullWidth
          multiline
          rows={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <div style={{ padding: "5px 0", width: "94%" }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label={t("tags")}
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          disabled={loadingBtn}
          fullWidth
        >
          {loadingBtn ? <CircularProgress size={25} /> : t("submit")}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          {t("clear")}
        </Button>
      </form>
    </Paper>
  );
};
export default Form;
