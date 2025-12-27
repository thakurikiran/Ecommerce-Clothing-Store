import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      res.json({ success: false, message: "unauthorized login again 1" });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (
      tokenDecode !==
      process.env.ADMIN_USERNAME + process.env.ADMIN_PASSWORD
    ) {
      res.json({ success: false, message: "unauthorized login again" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
