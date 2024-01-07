import { Request, Response } from "express";
import  partaiService from "../services/partaiService";
import { createPartaiSchema, getOnePartaiValidation } from "../utils/validator/partaiValidator";
import cloudinary from "../libs/cloudinary";

export default new class partaiController {
    async findAll(req: Request, res: Response) {
        try {
            const response = await partaiService.findAll();
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all partai:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            
            const { error, value } = getOnePartaiValidation.validate({id})
            
            if (error) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number"
                })
            }
            
            const response = await partaiService.findOne(value.id);
            return res.status(201).json(response);

        } catch (error) {
            console.error("Error creating a Partai:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
        }
    }
    
    async create(req: Request, res : Response) {
        try {
            const data = {
                no: req.body.no,
                chairman: req.body.chairman,
                visionAndMission: req.body.visionAndMission,
                address: req.body.address,
                paslon: req.body.paslon,
                picture: res.locals.filename
            }
            const { error, value } = createPartaiSchema.validate(data)
            if(error) return res.status(400).json(error.details[0].message)
            
            
            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.picture)

            const obj = {
                ...value,
                picture: cloudinaryRes.secure_url,
            }

            const response = await partaiService.create(obj);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error creating partai:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const existingPartai = await partaiService.findOne(id);

            if (!existingPartai) {
                return res.status(404).json({ message: "Partai not found" });
            }

            await partaiService.delete(id);

            return res.status(200).json({ message: "Success delete partai" });
        } catch (error) {
            console.error("Error deleting partai:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const existingPartai = await partaiService.findOne(id);

            if (!existingPartai) {
                return res.status(404).json({ message: "Partai not found" });
            }

            const data = {
                no: req.body.no,
                chairman: req.body.chairman,
                visionAndMission: req.body.visionAndMission,
                address: req.body.address,
                paslon: req.body.paslon,
                picture: res.locals.filename
            };
            const { error, value } = createPartaiSchema.validate(data);
            if (error) return res.status(400).json(error.details[0].message);

            cloudinary.upload();
            const cloudinaryRes = await cloudinary.destination(value.picture);

            const updatedData = {
                ...value,
                picture: cloudinaryRes.secure_url,
            };

            await partaiService.update(id, updatedData);

            return res.status(200).json({ message: "Success update partai" });
        } catch (error) {
            console.error("Error updating partai:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}
