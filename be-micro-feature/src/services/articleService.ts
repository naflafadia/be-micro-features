import { article } from './../entity/article';
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"

export default new class ArticleServices {
    private readonly ArticleRepository : Repository<article> = AppDataSource.getRepository(article)

    async create(data: article): Promise<object | string> {
        try {
            const response = await this.ArticleRepository.save(data)
            return {
                message: "success create article",
                data: response
            }
        } catch (error) {
          console.error("Error in ArticleService.create:", error);
            return "message: something error while create article"
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
    async getAll(): Promise<object | string> {
        try {
            const response = await this.ArticleRepository.find({
                relations: ["user"],
                select: {
                    user: {
                        username: true
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

    async getOne(id: number): Promise<object | string> {
        try {
          const response = await this.ArticleRepository.findOne({
            where: { id },
            relations: ["user"],
            select: {
              user: {
                username: true,
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
}