import * as express from "express";
import AuthController from "../controllers/AuthController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import UploadFile from "../middlewares/UploadFile";
import ThreadController from "../controllers/ThreadController";
import LikeController from "../controllers/LikeController";
import ReplieController from "../controllers/ReplieController";
import FollowingController from "../controllers/FollowingController";

const router = express.Router();

// Auth
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/auth/check", AuthMiddleware.Auth, AuthController.check)

// Thread
router.post("/thread", AuthMiddleware.Auth, ThreadController.create)
router.get("/thread", AuthMiddleware.Auth, ThreadController.getAll)
router.get("/thread/:id", ThreadController.getOne)
router.patch("/thread/:id", AuthMiddleware.Auth, UploadFile.upload("imageThread"), ThreadController.update)
router.delete("/thread/:id", AuthMiddleware.Auth, ThreadController.delete)

// Like
router.post("/like", AuthMiddleware.Auth, LikeController.create)
router.delete("/like/:thread_id", AuthMiddleware.Auth, LikeController.delete)

// Reply
router.post("/reply", AuthMiddleware.Auth, ReplieController.create)
router.get("/reply", ReplieController.getAll)
router.get("/reply/:id", ReplieController.getOne)
router.patch("/reply/:id", AuthMiddleware.Auth, ReplieController.update)
router.delete("/reply/:id", AuthMiddleware.Auth, ReplieController.delete)

//Follow
router.post("/follow", AuthMiddleware.Auth, FollowingController.create)
router.get("/follow/following", AuthMiddleware.Auth, FollowingController.findMyFollowing)
router.get("/follow/follower", AuthMiddleware.Auth, FollowingController.findMyFollower)
router.delete("/follow/:id", AuthMiddleware.Auth, FollowingController.delete)


export default router;
