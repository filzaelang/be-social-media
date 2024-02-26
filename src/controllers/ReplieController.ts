import { Request, Response } from "express";
import ReplieServices from "../services/ReplieServices";
import { createReplyValidation } from "../utils/validator/RepliesValidator";
import cloudinary from "../libs/cloudinary";

export default new class RepliesController {
    // async create(req: Request, res: Response) {
    //     try {
    //         const data = req.body;
    //         const loginSession = res.locals.loginSession;

    //         const obj = {
    //             ...data,
    //             user_id: loginSession.obj.id,
    //             thread_id: data.thread_id,
    //             created_by: loginSession.obj.id,
    //             updated_by: loginSession.obj.id
    //         };

    //         const response = await ReplieServices.create(obj);
    //         return res.status(201).json(response);
    //     } catch (error) {
    //         console.error("Error creating replie", error);
    //         return res.status(500).json({ message: "Internal server error", error: error.message });
    //     }
    // }

    async find(req: Request, res: Response) {
        try {
            const response = await ReplieServices.find(req.query);
            return res.status(200).json(response);
        } catch (error) {
            return res
                .status(500)
                .json({ error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const loginSession = res.locals.loginSession;

            const data = {
                content: req.body.content ? req.body.content : null,
                image: req.file ? res.locals.filename : null,
                thread_id: parseInt(req.body.thread_id),
            }

            const { error, value } = createReplyValidation.validate(data);
            if (error) return res.status(400).json(error);

            if (req.file) {
                cloudinary.upload();
                const cloudinaryRes = await cloudinary.destination(value.image)
                value.image = cloudinaryRes.secure_url
            }

            const obj = {
                ...value,
                created_by: loginSession.obj.id,
                updated_by: loginSession.obj.id
            };

            console.log("+++++++++++")
            console.log(obj)
            console.log("+++++++++++")

            const response = await ReplieServices.create(obj);
            return res.status(200).json(response);
        } catch (error) {
            return res
                .status(500)
                .json({ error: error.message });
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