// // routes/userRoutes.js
// import express from "express";
// import protect from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Profile route: This will only be accessible if the user is authenticated
// router.get("/profile", protect, (req, res) => {
//   res.status(200).json({
//     message: "Accessed protected route!",
//     user: req.user, // User info decoded from the JWT
//   });
// });

// export default router;
