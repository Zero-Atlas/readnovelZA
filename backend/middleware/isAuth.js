module.exports = (req, res, next) => {
  if (req.session.isLogin) {
    return next();
  }
  return res
    .status(401)
    .json({ message: "Please login to use this function." });
};
