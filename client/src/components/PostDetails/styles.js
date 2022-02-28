import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    height: "100%",
    maxHeight: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column-reverse",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
    wordBreak: "break-all",
  },
  imageSection: {
    marginLeft: "20px",

    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  recommendedImg: {
    borderRadius: "20px",
    width: "100%",
    height: "250px",
    objectFit: "cover",
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
  },
}));
