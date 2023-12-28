import { Request, Response } from "express";
import articleService from "../services/articleService";

export default new class articleController {
    async findAll(req: Request, res : Response) {
        try {
            const response = await articleService.findAll();
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all article:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}