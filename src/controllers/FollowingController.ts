import { Request, Response } from "express";
import FollowingServices from "../services/FollowingServices";

export default new class FollowingController {

    async findMyFollowing(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession;
            const response = await FollowingServices.findMyFollowing(loginSession.obj.id);
            return res.status(200).json(response)
        } catch (error) {
            console.error("Error getting all following", error);
            return res.status(500).json({ message: "Internal server error", error: error.message })
        }
    }

    async findMyFollower(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession;
            const response = await FollowingServices.findMyFollower(loginSession.obj.id);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all follower", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const loginSession = res.locals.loginSession;

            const obj = {
                ...data,
                following_id: data.following_id,
                follower_id: loginSession.obj.id,
                created_by: loginSession.obj.id,
                updated_by: loginSession.obj.id
            };

            const response = await FollowingServices.create(obj, loginSession, data);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error following", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const response = await FollowingServices.delete(id);

            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number",
                });
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Error unfollowing", error);
            return res.status(500).json({ message: "Internal server error", error: error.message })
        }
    }
}