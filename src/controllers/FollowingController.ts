import { Request, Response } from "express";
import FollowingServices from "../services/FollowingServices";

export default new class FollowingController {

    async find(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession;
            const limit = (req.query.limit ?? 0) as number;
            const type = (req.query.type ?? "") as string;

            const response = await FollowingServices.find(loginSession, type, limit);
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const loginSession = res.locals.loginSession;

            const obj = {
                ...data,
                following_id: { id: data.following_id },
                follower_id: { id: loginSession.obj.id },
                created_by: { id: loginSession.obj.id },
                updated_by: { id: loginSession.obj.id },
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
            const id = parseInt(req.params.following_id, 10);
            const loginSession = res.locals.loginSession
            const response = await FollowingServices.delete(id, loginSession);

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