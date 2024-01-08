import { Request, Response } from "express";
import { createVoteValidation } from "../utils/validator/voteValidator";
import voteService from "../services/voteService";


export default new class voteController {
async create(req: Request, res: Response) {
  try {
    const data = req.body;
    const loginSession = res.locals.loginSession.id;

    const { error, value } = createVoteValidation.validate(data);
    if (error) {
      return res.status(400).json(error);
    }
    
    const voter = {
      user: loginSession,
      paslon: value.paslon
    };

    const response = await voteService.create(voter);
    return res.status(201).json(response);
  } catch (error) {
    console.error("Error creating a Vote:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

    async getAll(req: Request, res: Response) {
      try {
        const response = await voteService.getAll();
        return res.status(200).json(response);
      } catch (error) {
          return res.status(500).json({ message: "Internal server error", error: error.message });
        }
      }

    async getOne(req: Request, res: Response) {
      try {
        const id = parseInt(req.params.id, 10);
        const response = await voteService.getOne(id);
        return res.status(200).json(response);
      } catch (error) {
        console.error("Error getting a Vote:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}