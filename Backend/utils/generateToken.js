import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "3h" });
};
