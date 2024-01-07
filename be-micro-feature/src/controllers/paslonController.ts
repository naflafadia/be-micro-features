import { Request, Response } from "express";
import paslonService from "../services/paslonService";
import { createPaslonSchema } from "../utils/validator/paslonValidator";
import cloudinary from "../libs/cloudinary";

export default new class paslonController {
    async findAll(req: Request, res: Response) {
        try {
            const data = await paslonService.findAll();
            let response = {
                message: "success",
                data
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all paslons:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const data = await paslonService.findOne(id);

            if (typeof data === "string") {
                return res.status(404).json({ message: data });
            }

            let response = {
                message: "success",
                data,
            };

            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting paslon by id:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
    
    async create(req: Request, res : Response) {
        try {
            const data = {
                no: req.body.no,
                name: req.body.name,
                visionAndMission: req.body.visionAndMission,
                picture: res.locals.filename
            }
            const { error, value } = createPaslonSchema.validate(data)
            if(error) return res.status(400).json(error.details[0].message)
            
            
            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.picture)

            const obj = {
                no: value.no,
                name: value.name,
                visionAndMission: value.visionAndMission,
                picture: cloudinaryRes.secure_url
            }

            const response = await paslonService.create(obj);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error creating paslon:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const data = req.body;
    
            const response = await paslonService.update(id, data);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error updating paslon:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
    
            const response = await paslonService.delete(id);
            return res.status(200).json({ message: response });
        } catch (error) {
            console.error("Error deleting paslon:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}
