import { Repository } from "typeorm";
import { vote } from "../entity/vote";
import { AppDataSource } from "../data-source";

export default new class VoteServices {
    private readonly VoteRepository: Repository<vote> = AppDataSource.getRepository(vote);

    async findAll(): Promise<object> {
        try {
            const vote = await this.VoteRepository
                .createQueryBuilder("vote")
                .getMany();

            return vote;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number): Promise<object | string> {
        try {
            const vote = await this.VoteRepository
                .createQueryBuilder("vote")
                .where("vote.id = :id", { id })
                .getOne();

            if (!vote) {
                return "message: vote not found";
            }

            return vote;
        } catch (error) {
            return "message: something went wrong while getting the vote";
        }
    }

    async create(reqBody: object): Promise<object> {
        try {
            const vote = await this.VoteRepository.save(reqBody);

            return {
                message: "success",
                data: vote,
            };
        } catch (error) {
            throw error;
        }
    }
} 