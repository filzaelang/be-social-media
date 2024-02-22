import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";
import { createThread, updateThread } from "../utils/validator/ThreadValidator";
import cloudinary from "../libs/cloudinary";

export default new class ThreadController {
    async getAll(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession;
            const response = await ThreadServices.getAll(loginSession);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all thread", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const data = await ThreadServices.getOne(id);

            if (typeof data === "string") {
                return res.status(404).json({ message: data })
            }

            let response = {
                message: "success",
                data
            }

            return res.json(response);
        } catch (error) {
            console.error("Error getting the thread", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {

            const loginSession = res.locals.loginSession
            console.log(loginSession.obj.full_name)

            const data = {
                content: req.body.content,
                image: res.locals.filename,
                // image: req.body.image
            }

            const { error, value } = createThread.validate(data);
            if (error) return res.status(400).json(error);

            // cloudinary.upload();
            // const cloudinaryRes = await cloudinary.destination(value.image)

            const obj = {
                ...value,
                // image: cloudinaryRes.secure_url,
                created_by: loginSession.obj.id,
                updated_by: loginSession.obj.id
            };

            const response = await ThreadServices.create(obj);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error creating a thread", error);
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
            const data = {
                content: req.body.content,
                image: res.locals.filename
            };

            const { error, value } = updateThread.validate(data);
            if (error) return res.status(400).json(error);

            const response = await ThreadServices.update(id, value);
            return res.status(201).json(response);

        } catch (error) {
            console.error("Error updating a thread", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const response = await ThreadServices.delete(id);

            if (typeof response === "string") {
                return res.status(404).json({ message: response });
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Error deleting a thread", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}