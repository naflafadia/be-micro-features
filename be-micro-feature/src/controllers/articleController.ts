import { Request, Response } from "express";
import articleService from "../services/articleService";
import {createArticleSchema, getOneArticleValidation} from "../utils/validator/articleValidator";
import cloudinary from "../libs/cloudinary";

export default new class articleController {
    async create(req: Request, res : Response) {
        try {
            const userId = res.locals.loginSession.id;
            const data = {
                author : req.body.author,
                title : req.body.title,
                description: req.body.description,
                date: req.body.date,
                picture: res.locals.filename,
            }

            const { error, value } = createArticleSchema.validate(data);
            if(error) return res.status(400).json(error.details[0].message)

            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.picture)

            const obj = {
                ...value,
                user: userId,
                picture: cloudinaryRes.secure_url
            }

            const response = await articleService.create(obj);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error creating article:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
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
        
            const response = await articleService.delete(id);
            return res.status(201).json(response);
            } catch (error) {
                console.error("Error creating a Article:", error);
                return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
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
            const response = await articleService.update(id, data);
            return res.status(201).json(response);
            } catch (error) {
                console.error("Error creating a Article:", error);
                return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
            }
        }

    async getAll(req: Request, res : Response) {
        try {
            const response = await articleService.getAll();
            return res.status(200).json(response);
            } catch (error) {
                console.error("Error getting all article:", error);
                return res.status(500).json({ message: "Internal server error", error: error.message });
            }
        }

    async getOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const { error, value } = getOneArticleValidation.validate({id});

            if (error) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number"
                })
            }
            const response = await articleService.getOne(value.id);
            return res.status(201).json(response);
        } catch (error) {
            console.error("Error creating a Article:", error);
            return res
                .status(500)
                .json({ message: "Internal server error", error: error.message });
            }
    } 
    
    async getAllArticleCard(req: Request, res: Response) {
        try {
          const response = await articleService.getAllArticlesCard();
          return res.status(200).json(response);
        } catch (error) {
          console.error("Error getting all articles:", error);
          return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
        }
      }
      async getOneArticleCard(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
    
            if (isNaN(id)) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number",
                });
            }
    
            const response = await articleService.getOneArticlesCard(id);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting a Article:", error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    }
}