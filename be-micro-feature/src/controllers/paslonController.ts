import { Request, Response } from "express";
import paslonService from "../services/paslonService";
import { createPaslonSchema, getOnePaslonValidation } from "../utils/validator/paslonValidator";
import cloudinary from "../libs/cloudinary"

export default new (class paslonController {
    async create(req: Request, res : Response) {
        try {
            const data = {
                name : req.body.name,
                no : req.body.no,
                visionAndMission : req.body.visionAndMission,
                picture: res.locals.filename
            }

            const { error, value } = createPaslonSchema.validate(data);
            if(error) return res.status(400).json(error.details[0].message)
            
            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.picture)
            
            const obj = {
                ...value,
                picture: cloudinaryRes.secure_url
            }
            
            console.log(obj)
            
            const response = await paslonService.create(obj);
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number"
                })
            }
            const data = {
                name: req.body.name,
                no: req.body.no,
                visionAndMission: req.body.visionAndMission,
                picture: res.locals.filename,
            };
            const response = await paslonService.update(id, data);
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number"
                })
            }
            const response = await paslonService.delete(id);
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const response = await paslonService.getAll();
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            
            const { error, value } = getOnePaslonValidation.validate({id})
            
            if (error) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number"
                })
            }
            
            const response = await paslonService.getOne(value.id);
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
})