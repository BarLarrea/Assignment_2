import express from "express";
import { registerUser, loginUser, logoutUser,refreshToken} from "../controller/userController"; 

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh_token", refreshToken);

export default router;