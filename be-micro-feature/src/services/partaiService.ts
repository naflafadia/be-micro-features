import { Repository } from "typeorm";
import { partai } from "../entity/partai";
import { AppDataSource } from "../data-source";

export default new class PartaiServices {
    private readonly PartaiRepository: Repository<partai> = AppDataSource.getRepository(partai);

    async findAll(): Promise<object> {
        try {
            const partai = await this.PartaiRepository
                .createQueryBuilder("partai")
                .getMany();

            return partai;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number): Promise<object | string> {
        try {
            const partai = await this.PartaiRepository
                .createQueryBuilder("partai")
                .where("partai.id = :id", { id })
                .getOne();

            if (!partai) {
                return "message: partai not found";
            }

            return partai;
        } catch (error) {
            return "message: something went wrong while getting the partai";
        }
    }

    async create(reqBody: object): Promise<object> {
        try {
            const partai = await this.PartaiRepository.save(reqBody);

            return {
                message: "success",
                data: partai,
            };
        } catch (error) {
            throw error;
        }
    }
}