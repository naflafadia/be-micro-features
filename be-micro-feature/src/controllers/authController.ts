import { Request, Response } from "express";
import authService from "../services/authService";
import { registerSchema } from "../utils/validator/authValidator";
import { loginSchema } from "../utils/validator/authValidator";
import { getOneUserValidation } from "../utils/validator/authValidator";

export default new class AuthController {
    async register(req: Request, res : Response) {
        try {
            const data = req.body
            const { error, value } = registerSchema.validate(data)
            if(error) return res.status(400).json(error.details[0].message)

            const response = await authService.register(value)
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error creating article:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
    async login(req: Request, res : Response) {
        try {
            const data = req.body

            const { error, value } = loginSchema.validate(data)
            if(error) return res.status(400).json(error.details[0].message)

            const response = await authService.login(value)
            return res.status(200).json(response);
        } catch(error) {
            return res.status(500).json(error)
        }
    }
    async getAll(req: Request, res: Response) {
        try {
            const response = await authService.getAll();
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            
            const {error, value} = getOneUserValidation.validate({id});
            
            if (error) {
                return res.status(400).json({
                    message: "Invalid ID provided",
                    error: "Invalid input for type number"
                })
            }
            
            const response = await authService.getOne(value.id);
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
