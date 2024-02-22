import { Request, Response } from "express";
import LikeServices from "../services/LikeServices";

export default new class LikeController {
    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const loginSession = res.locals.loginSession;

            const obj = {
                ...data,
                user_id: { id: loginSession.obj.id },
                thread_id: { id: data.thread_id },
                created_by: { id: loginSession.obj.id },
                updated_by: { id: loginSession.obj.id }
            };

            const response = await LikeServices.create(obj);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error creating Like", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }


    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.thread_id, 10);
            const loginSession = res.locals.loginSession;
            const response = await LikeServices.delete(id, loginSession);


            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number",
                });
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Error disliking", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}