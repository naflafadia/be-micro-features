import { Request, Response } from "express";
import articleService from "../services/articleService";
import { createArticleSchema } from "../utils/validator/articleValidator";
import cloudinary from "../libs/cloudinary";

export default new class articleController {
    async findAll(req: Request, res : Response) {
        try {
            const data = await articleService.findAll();
            let response = {
                message: "success",
                data
            }

            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all article:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10); 
            const data = await articleService.findOne(id);
    
            if (typeof data === 'string') {
                return res.status(404).json({ message: data });
            }
    
            let response = {
                message: "success",
                data
            };
    
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting article by id:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
    
    
    async create(req: Request, res : Response) {
        try {
            const data = {
                author: req.body.author,
                title: req.body.title,
                date: req.body.date,
                description: req.body.description,
                picture: res.locals.filename
            }
            const { error, value } = createArticleSchema.validate(data)
            if(error) return res.status(400).json(error.details[0].message)
            
            
            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.picture)

            const obj = {
                author: value.author,
                title: value.title,
                date: value.date,
                description: value.description,
                picture: cloudinaryRes.secure_url
            }

            const response = await articleService.create(obj);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error creating article:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}
