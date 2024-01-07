import { Repository, getManager, UpdateResult } from "typeorm"
import { article } from "../entity/article"
import { AppDataSource } from "../data-source"

export default new class ArticleServices {
    private readonly ArticleRepository : Repository<article> = AppDataSource.getRepository(article)

    async findAll(): Promise<object | string> {
        try {
            const response = await this.ArticleRepository.find({
                relations: ["user"],
                select: {
                    user: {
                        fullName: true
                    }
                }
            })
            return {
                message: "success get all article",
                data: response
            }
        } catch (error) {
            return "message: something error while get all article"
        }
    }

    async findOne(id: number): Promise<object | string> {
        try {
          const response = await this.ArticleRepository.findOne({
            where: { id },
            relations: ["user"],
            select: {
              user: {
                fullName: true,
              },
            },
          });
          return {
            message: "success getting a Articles",
            data: response,
          };
        } catch (error) {
          return "message: something error while getting a Articles";
        }
      }

      async getAllArticlesCard(): Promise<object | string> {
        try {
          const response = await this.ArticleRepository.find({
            relations: {
              user: true,
            },
            select: {
              id: true,
              title: true,
              picture: true,
              user: {
                fullName: true,
              },
            },
          });
    
          return {
            message: "success getting all cards article",
            data: response,
          };
        } catch (error) {
            console.error("Error getting card article:", error);
          return `message: something error while getting cards article`;
        }
      }

      async getOneArticlesCard(id: number): Promise<object | string> {
        try {
          const response = await this.ArticleRepository.find({
            where: { id },
            relations: {
              user: true,
            },
            select: {
              id: true,
              title: true,
              picture: true,
              user: {
                fullName: true,
              },
            },
          });
    
          return {
            message: "success getting a card article",
            data: response,
          };
        } catch (error) {
          return "message: something error while getting card article";
        }
      }

    async create(reqBody: object) : Promise<object> {
        try {
            const article = await this.ArticleRepository.save(reqBody);

            return {
                message: "success",
                data: article
            };
        } catch(error) {
            throw error;
        }
    }

    async update(id: number, data: article): Promise<object | string> {
        try {
            const response = await this.ArticleRepository
                .createQueryBuilder()
                .update(article)
                .set(data)
                .where("id = :id", { id })
                .execute();
            return {
                message: "success update article",
                data: response
            }
        } catch (error) {
            return "message: something error while update article"
        }
    }

    async delete (id: number): Promise<object | string> {
        try {
            const response = await this.ArticleRepository.delete ({ id })
            return {
                message: "success delete article",
                data: response
            }
        } catch (error) {
            return "message: something error while delete article"
        }
    }
}
