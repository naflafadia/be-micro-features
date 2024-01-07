import { Repository, getManager, FindOneOptions } from "typeorm";
import { partai } from "../entity/partai";
import { AppDataSource } from "../data-source";

export default new class PartaiServices {
    private readonly PartaiRepository: Repository<partai> = AppDataSource.getRepository(partai);

    async findAll(): Promise<object | string> {
        try {
          const response = await this.PartaiRepository.find();
          const formattedResponse = response.map(partai => ({
            id: partai.id,
            name: partai.name,
            chairman: partai.chairman,
            visionAndMission: partai.visionAndMission,
            address: partai.address,
            picture: partai.picture,
          }));
    
          return {
            message: 'success get all partai',
            data: formattedResponse,
          };
        } catch (error) {
          console.error('Error getting all partai:', error);
          return {
            message: 'something error while get all partai',
            error: error.message,
          };
        }
      }

      async findOne(id: number): Promise<object | string> {
        try {
            const options: FindOneOptions<partai> = {
                select: ['name', 'chairman', 'visionAndMission', 'address', 'picture'],
            };

            const response = await this.PartaiRepository.findOne({ where: { id }, ...options });
    
            if (!response) {
                return {
                    message: 'Partai not found',
                };
            }
    
            const formattedResponse = {
                id: response.id,
                name: response.name,
                chairman: response.chairman,
                visionAndMission: response.visionAndMission,
                address: response.address,
                picture: response.picture,
            };
    
            return {
                message: 'success get one partai',
                data: formattedResponse,
            };
        } catch (error) {
          console.error('Error getting one partai:', error);
          return {
            message: 'something error while get one partai',
            error: error.message,
          };
        }
    }

      async create(data: Partial<partai>): Promise<object | string> {
        try {
          const response = await this.PartaiRepository.save(data);
    
          return {
            message: 'success create partai',
            data: response,
          };
        } catch (error) {
          console.error('Error creating partai:', error);
          return {
            message: 'something error while create partai',
            error: error.message,
          };
        }
      }

      async update(id: number, data: Partial<partai>): Promise<object | string> {
        try {
            const existingPartai = await this.PartaiRepository.findOne({ where: { id } });
    
            if (!existingPartai) {
                return {
                    message: 'Partai not found',
                };
            }
    
            await this.PartaiRepository.update(id, data);
            const updatedPartai = await this.PartaiRepository.findOne({ where: { id } });
    
            return {
                message: 'success update partai',
                data: updatedPartai,
            };
        } catch (error) {
            console.error('Error updating partai:', error);
            return {
                message: 'something error while updating partai',
                error: error.message,
            };
        }
    }

    async delete(id: number): Promise<string> {
      try {
          const existingPartai = await this.PartaiRepository.findOne({ where: { id } });
  
          if (!existingPartai) {
              return "message: Partai not found";
          }
  
          await this.PartaiRepository.remove(existingPartai);
  
          return "message: success delete partai";
      } catch (error) {
          console.error("Error deleting partai:", error);
          return "message: something error while deleting partai";
      }
  }
}