import { Request, Response } from "express";
import ReplieServices from "../services/ReplieServices";

export default new class RepliesController {
    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const loginSession = res.locals.loginSession;

            const obj = {
                ...data,
                user_id: loginSession.obj.id,
                thread_id: data.thread_id,
                created_by: loginSession.obj.id,
                updated_by: loginSession.obj.id
            };

            const response = await ReplieServices.create(obj);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error creating replie", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const response = await ReplieServices.getAll();
            return res.status(200).json(response)
        } catch (error) {
            console.error("Error getting all replies", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const response = await ReplieServices.getOne(id);
            return res.status(200).json(response)
        } catch (error) {
            console.error("Error getting a reply", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number",
                });
            }
            const data = req.body;

            const response = await ReplieServices.update(id, data);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error updating a reply", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const response = await ReplieServices.delete(id);

            if (typeof response === "string") {
                return res.status(404).json({ message: response });
            }

            return res.status(200).json({ message: response })
        } catch (error) {
            console.error("Error deleting a reply", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}