import basicAuth from "basic-auth";
import bcrypt from "bcryptjs";
import User from "../../config/models/user.js";

const auth = async (req, res, next) => {
  const credentials = basicAuth(req);
  if (!credentials || !credentials.name || !credentials.pass) {
    return res.status(400).json({ message: "Missing credentials" });
  }
  try {
    const user = await User.findOne({ email: credentials.name });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(credentials.pass, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default auth;
