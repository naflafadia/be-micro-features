import { Repository } from 'typeorm';
import { paslon } from '../entity/paslon';
import { AppDataSource } from '../data-source';

export default new class PaslonServices {
    private readonly PaslonRepository : Repository<paslon> = AppDataSource.getRepository(paslon)

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

    async update (id: number, data: any): Promise<object | string> {
        try {
            const response = await this.PaslonRepository.update(id, data)
            return {
                message: "success update paslon",
                data: response
            }
        } catch (error) {
            return "message: something error while update paslon"
        }
    }

    async delete (id: number): Promise<object | string> {
        try {
            const response = await this.PaslonRepository.delete(id)
            return {
                message: "success delete paslon",
                data: response
            }
        } catch (error) {
            return "message: something error while delete paslon"
        }
    }

    async getAll(): Promise<object | string> {
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

    async getOne (id: number): Promise<object | string> {
        try {
            const response = await this.PaslonRepository.find({
                where: { id },
                relations: ["partai"],
                select: {
                    partai: {
                        name: true
                    }
                }
            })

            return {
                message: "success get one paslon",
                data: response
            }
        } catch (error) {
            return "message: something error while get one paslon"
        }
    }
}