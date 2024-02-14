import * as express from "express";
import AuthController from "../controllers/AuthController";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import UploadFile from "../middlewares/UploadFile";
import ThreadController from "../controllers/ThreadController";
import LikeController from "../controllers/LikeController";
import ReplieController from "../controllers/ReplieController";

const router = express.Router();

// Auth
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login)

// Thread
router.post("/thread", AuthMiddleware.Auth, ThreadController.create)
router.get("/thread", ThreadController.getAll)
router.get("/thread/:id", ThreadController.getOne)
router.patch("/thread/:id", AuthMiddleware.Auth, ThreadController.update)
router.delete("/thread/:id", AuthMiddleware.Auth, ThreadController.delete)

// Like
router.post("/like", AuthMiddleware.Auth, LikeController.create)
router.delete("/like/:id", AuthMiddleware.Auth, LikeController.delete)

// Reply
router.post("/reply", AuthMiddleware.Auth, ReplieController.create)
router.get("/reply", ReplieController.getAll)
router.get("/reply/:id", ReplieController.getOne)
router.patch("/reply/:id", AuthMiddleware.Auth, ReplieController.update)
router.delete("/reply/:id", AuthMiddleware.Auth, ReplieController.delete)

//Follow


export default router;
