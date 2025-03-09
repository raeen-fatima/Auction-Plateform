import jwt from "jsonwebtoken";
import User from "../models/User.js";
const protect = async (req, res, next) => {
  try {
    console.log("Headers:", req.headers); // 🔹 Debugging  
    console.log("Authorization Header:", req.headers.authorization); // 🔹 Debugging  

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("❌ Token Missing");
      return res.status(401).json({ message: "Not Authorized, No Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded); // 🔹 Debugging  

    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      console.log("❌ User Not Found in DB");
      return res.status(401).json({ message: "Not Authorized, User Not Found" });
    }

    console.log("✅ User Found:", req.user.email);
    next();
  } catch (error) {
    console.log("❌ JWT Error:", error.message);
    res.status(401).json({ message: "Invalid Token" });
  }
};


export default protect;
