import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import cloudinary from "../libs/cloudinary";

export default new class UserController {
    async find(req: Request, res: Response) {
        try {
            const response = await UserServices.find(req.body)
            return res.status(201).json(response)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}