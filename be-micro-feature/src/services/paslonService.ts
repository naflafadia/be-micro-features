import { Repository } from "typeorm";
import { paslon } from "../entity/paslon";
import { AppDataSource } from "../data-source";

export default new class PaslonServices {
    private readonly PaslonRepository: Repository<paslon> = AppDataSource.getRepository(paslon);

    async findAll(): Promise<object | string> {
        try {
            const response = await this.PaslonRepository.find({
                relations: ["partai"],
                select: {
                    partai: {
                        name: true
                    }
                }
            });
            return {
                message: "success get all paslon",
                data: response
            };
        } catch (error) {
            return "message: something error while get all paslon";
        }
    }

    async findOne(id: number): Promise<object | string> {
        try {
            const response = await this.PaslonRepository.findOne({
                where: { id },
                relations: ["partai"],
                select: {
                    partai: {
                        name: true
                    }
                }
            });
    
            if (!response) {
                return {
                    message: "Paslon not found",
                    data: null
                };
            }
    
            return {
                message: "success get one paslon",
                data: response
            };
        } catch (error) {
            console.error("Error while getting one paslon:", error);
            return "message: something error while getting one paslon";
        }
    }

    async create (data: any): Promise<object | string> {
        try {
            const noPaslon = await this.PaslonRepository.count();
            if(
                data.noPaslon < noPaslon + 1 ||
                data.noPaslon > noPaslon + 1
            )
            return `message: noPaslon already exist, please input noPaslon ${noPaslon + 1} or more`
            
            const response = await this.PaslonRepository.save(data)
            console.log(response)
            return {
                message: "success create paslon",
                data: response
            }
        } catch (error) {
            console.error("Error:", error);
            return "message: something error while create paslon"
        }
    }

    async update(id: number, data: any): Promise<object | string> {
        try {
            const existingPaslon = await this.PaslonRepository.findOne({ where: { id } });
    
            if (!existingPaslon) {
                return "message: Paslon not found";
            }
    
            await this.PaslonRepository.update(id, data);
            const updatedPaslon = await this.PaslonRepository.findOne({ where: { id } });
    
            return {
                message: "success update paslon",
                data: updatedPaslon
            };
        } catch (error) {
            console.error("Error updating paslon:", error);
            return "message: something error while updating paslon";
        }
    }

    async delete(id: number): Promise<string> {
        try {
            const existingPaslon = await this.PaslonRepository.findOne({ where: { id } });
    
            if (!existingPaslon) {
                return "message: Paslon not found";
            }
    
            await this.PaslonRepository.remove(existingPaslon);
    
            return "message: success delete paslon";
        } catch (error) {
            console.error("Error deleting paslon:", error);
            return "message: something error while deleting paslon";
        }
    }
}