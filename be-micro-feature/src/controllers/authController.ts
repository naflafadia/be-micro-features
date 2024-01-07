import { Request, Response } from "express";
import authService from "../services/authService";
import { registerSchema, loginSchema, getOneUserValidation } from "../utils/validator/authValidator";

export default new class AuthController {
    async register(req: Request, res: Response) {
        try {
          const data = req.body;
          const { error, value } = registerSchema.validate(data);
    
          if (error) return res.status(400).json(error.details[0].message);
    
          const response = await authService.register(value);
          return res.status(200).json(response);
        } catch (error) {
          console.error("Error creating user:", error);
          return res.status(500).json({ message: "Internal server error", error: error.message });
        }
      }

    async login(req: Request, res: Response) {
    try {
      const data = req.body;
      const { error, value } = loginSchema.validate(data);

      if (error) return res.status(400).json(error.details[0].message);

      const response = await authService.login(value);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

   async findAll(req: Request, res: Response) {
    try {
      const response = await authService.findAll();
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);

      const { error, value } = getOneUserValidation.validate({ id });

      if (error) {
        return res.status(400).json({
          message: "Invalid ID provided",
          error: "Invalid input for type number",
        });
      }

      const response = await authService.findOne(value.id);
      return res.status(201).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
