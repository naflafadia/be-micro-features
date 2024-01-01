import { Request, Response } from "express";
import voteService from "../services/voteService";
import { createVoteSchema } from "../utils/validator/voteValidator";
import cloudinary from "../libs/cloudinary";

export default new class VoteController {
    async findAll(req: Request, res: Response) {
        try {
            const data = await voteService.findAll();
            let response = {
                message: "success",
                data
            };

            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting all votes:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const data = await voteService.findOne(id);

            if (typeof data === "string") {
                return res.status(404).json({ message: data });
            }

            let response = {
                message: "success",
                data,
            };

            return res.status(200).json(response);
        } catch (error) {
            console.error("Error getting vote by id:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = {
                no: req.body.no,
                name: req.body.name,
                address: req.body.address,
                accumulation: req.body.accumulation,
                numberOfVotes: req.body.numberOfVotes,
                gender: req.body.gender,
                paslon: req.body.paslon,
                picture: res.locals.filename
            }
            const { error, value } = createVoteSchema.validate(data)
            if(error) return res.status(400).json(error.details[0].message)
            
            
            cloudinary.upload()
            const cloudinaryRes = await cloudinary.destination(value.picture)

            const obj = {
                no: value.no,
                name: value.name,
                address: value.address,
                accumulation: value.accumulation,
                numberOfVotes: value.numberOfVotes,
                gender: value.gender,
                paslon: value.paslon,
                picture: cloudinaryRes.secure_url
            }
            const response = await voteService.create(obj);
            return res.status(200).json(response);
        } catch (error) {
            console.error("Error creating vote:", error);
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}