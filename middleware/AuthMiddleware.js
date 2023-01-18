import { verify } from "jsonwebtoken";

const validate = (req, res, next) => {
  const Btoken = req.headers["authorization"];
  const token = Btoken.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const { password, ...decoded } = verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default validate;
