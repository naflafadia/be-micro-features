import { Request, Response } from "express";
import partaiService from "../services/partaiService";
import { createPartaiSchema } from "../utils/validator/partaiValidator";
import cloudinary from "../libs/cloudinary";

export default new class partaiController {
    async findAll(req: Request, res: Response) {
        try {
            const data = await partaiService.findAll();
            let response = {
                message: "success",
                data
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all partais:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const data = await partaiService.findOne(id);

            if (typeof data === "string") {
                return res.status(404).json({ message: data });
            }

            let response = {
                message: "success",
                data,
            };

            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting partai by id:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
    
    async create(req: Request, res : Response) {
        try {
            const data = {
                no: req.body.no,
                chairman: req.body.chairman,
                visionAndMission: req.body.visionAndMission,
                address: req.body.address,
                picture: res.locals.filename
            }
            const { error, value } = createPartaiSchema.validate(data)
            if(error) return res.status(400).json(error.details[0].message)
            
            
            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.picture)

            const obj = {
                no: value.no,
                chairman: value.chairman,
                visionAndMission: value.visionAndMission,
                address: value.address,
                picture: cloudinaryRes.secure_url
            }

            const response = await partaiService.create(obj);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error creating partai:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}
