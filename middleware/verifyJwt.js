require("dotenv").config();
const data = require("../DAO/classesQuery").UsersQuery;
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) return res.status(403).end();

  const token = bearerHeader.split(" ")[1];
  const tokenCheck = jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) return false;
    return true;
  });

  const response = await data.getUsersToken({ token });
  const result = response.filter((obj) => obj.token === token);

  if (!!result.length && tokenCheck) {
    return next();
  }
  return res.status(403).end();
};
