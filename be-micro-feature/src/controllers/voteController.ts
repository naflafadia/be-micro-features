import { Request, Response } from "express";
import { createVoteValidation } from "../utils/validator/voteValidator";
import voteService from "../services/voteService";


export default new class voteController {
    async create(req: Request, res: Response) {
        try {
          const data = req.body
          const { error, value } = createVoteValidation.validate(data)
    
          if(error) return res.status(400).json(error)
    
          const response = await voteService.create(value);
          return res.status(201).json(response);
        } catch (error) {
          return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async findAll(req: Request, res: Response) {
      try {
        const response = await voteService.findAll();
        return res.status(200).json(response);
      } catch (error) {
          return res.status(500).json({ message: "Internal server error", error: error.message });
        }
      }

    async findOne(req: Request, res: Response) {
      try {
        const id = parseInt(req.params.id, 10);
        const response = await voteService.findOne(id);
        return res.status(200).json(response);
      } catch (error) {
        console.error("Error getting a Vote:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}