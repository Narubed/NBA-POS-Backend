module.exports = checkToken = async (req, res, next) => {

  if (req.headers.origin) {
    const web = ["https://nba-pos.nbadigitalservice.com"];
    const findData = web.find((item) => item === req.headers.origin);
    if (findData) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Token not provided Token ไม่ถูกต้อง",
        logout: false,
        description: "Unauthorized",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Token not provided Token ไม่ถูกต้อง",
      logout: false,
      description: "Unauthorized",
    });
  }
};
