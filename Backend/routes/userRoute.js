import express from "express";
import { signUpUser, loginUser } from "../controllers/userController.js";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
    res.json(req.user);
});

export default router;
