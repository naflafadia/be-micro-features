import { Request, Response } from "express";
import partaiService from "../services/partaiService";
import {createPartaiSchema, getOnePartaiValidation} from "../utils/validator/partaiValidator";
import cloudinary from "../libs/cloudinary"

export default new class PartaiController {
    async create(req: Request, res : Response) {
        try {
            const data = {
                name : req.body.name,
                chairman : req.body.chairman,
                visionAndMission: req.body.visionAndMission,
                address: req.body.address,
                paslon: req.body.paslon,
                picture: res.locals.filename
            }
            
            const { error, value } = createPartaiSchema.validate(data);
            if(error) return res.status(400).json(error.details[0].message)

            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.picture)
            
            const obj = {
                ...value,
                picture: cloudinaryRes.secure_url,
            }

            const response = await partaiService.create(obj);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error creating partai:", error);
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
            const response = await partaiService.update(id, data);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error creating a Partai:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number",
                });
            }
            const response = await partaiService.delete(id);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error creating a Partai:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            
            const { error, value } = getOnePartaiValidation.validate({id})
            
            if (error) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number"
                })
            }
            
            const response = await partaiService.getOne(value.id);
            return res.status(201).json(response);

        } catch (error) {
            console.error("Error creating a Partai:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const response = await partaiService.getAll();
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all partai:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}