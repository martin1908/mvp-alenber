

module.exports = (req, res, next) => {
  try {
    const token = req.user;
    console.log(token)
    next();
  } catch (error) {
    console.log(error)
  }
};
