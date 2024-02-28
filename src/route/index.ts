import * as express from "express";
import AuthController from "../controllers/AuthController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import UploadFile from "../middlewares/UploadFile";
import ThreadController from "../controllers/ThreadController";
import LikeController from "../controllers/LikeController";
import ReplieController from "../controllers/ReplieController";
import FollowingController from "../controllers/FollowingController";
import UserController from "../controllers/UserController";

const router = express.Router();

// Auth
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/check", AuthMiddleware.Auth, AuthController.check)

// User
router.post("/user", AuthMiddleware.Auth, UserController.find)
router.patch("/user/detail", AuthMiddleware.Auth, UploadFile.upload("photo_profile"), UserController.update)
router.get("/user/detail/:id", AuthMiddleware.Auth, UserController.findOne)

// Thread
router.post("/thread", AuthMiddleware.Auth, UploadFile.upload("image"), ThreadController.create)
router.get("/thread", AuthMiddleware.Auth, ThreadController.getAll)
router.get("/thread/user", AuthMiddleware.Auth, ThreadController.findUserThread)
router.get("/thread/user/:id", AuthMiddleware.Auth, ThreadController.findOtherUserThread)
router.get("/thread/:id", AuthMiddleware.Auth, ThreadController.getOne)
router.patch("/thread/:id", AuthMiddleware.Auth, UploadFile.upload("image"), ThreadController.update)
router.delete("/thread/:id", AuthMiddleware.Auth, ThreadController.delete)

// Like
router.post("/like", AuthMiddleware.Auth, LikeController.create)
router.delete("/like/:thread_id", AuthMiddleware.Auth, LikeController.delete)

// Reply
router.post("/reply", AuthMiddleware.Auth, UploadFile.upload("image"), ReplieController.create)
router.get("/replies", AuthMiddleware.Auth, ReplieController.find)
router.get("/reply/one/:id", AuthMiddleware.Auth, ReplieController.getOne)
router.patch("/reply/:id", AuthMiddleware.Auth, ReplieController.update)
router.delete("/reply/:id", AuthMiddleware.Auth, ReplieController.delete)

//Follow
router.post("/follow", AuthMiddleware.Auth, FollowingController.create)
router.get("/follows", AuthMiddleware.Auth, FollowingController.find)
router.delete("/follow/:following_id", AuthMiddleware.Auth, FollowingController.delete)


export default router;
