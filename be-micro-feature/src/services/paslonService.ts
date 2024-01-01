import { Repository } from "typeorm";
import { paslon } from "../entity/paslon";
import { AppDataSource } from "../data-source";

export default new class PaslonServices {
    private readonly PaslonRepository: Repository<paslon> = AppDataSource.getRepository(paslon);

    async findAll(): Promise<object> {
        try {
            const paslons = await this.PaslonRepository
                .createQueryBuilder("paslon")
                .getMany();

            return paslons;
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number): Promise<object | string> {
        try {
            const paslon = await this.PaslonRepository
                .createQueryBuilder("paslon")
                .where("paslon.id = :id", { id })
                .getOne();

            if (!paslon) {
                return "message: paslon not found";
            }

            return paslon;
        } catch (error) {
            return "message: something went wrong while getting the paslon";
        }
    }

    async create(reqBody: object): Promise<object> {
        try {
            const paslon = await this.PaslonRepository.save(reqBody);

            return {
                message: "success",
                data: paslon,
            };
        } catch (error) {
            throw error;
        }
    }
}