import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  //when using Request only can not see authorization so using express.Request
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Unauthorized request" });

  const token = req.headers.authorization.split(" ")[1];
  const isCustomAuth = token.length < 500;

  let decodedData;

  if (token && isCustomAuth) {
    decodedData = jwt.verify(token, "test");
    req.userId = decodedData?.id;
  } else {
    decodedData = jwt.decode(token);
    req.userId = decodedData?.sub; /// for google auth
  }
  next();
};

export default auth;
