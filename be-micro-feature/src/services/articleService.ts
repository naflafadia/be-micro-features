import { Repository } from "typeorm"
import { article } from "../entity/article"
import { AppDataSource } from "../data-source"

export default new class ArticleServices {
    private readonly ArticleRepository : Repository<article> = AppDataSource.getRepository(article)

    async findOne(id: number): Promise<object | string> {
        try {
            const response = await this.ArticleRepository
                .createQueryBuilder("article")
                .where("article.id = :id", { id })
                .getOne();

            if (!response) {
                return "message: article not found";
            }

            const mappedArticle = {
                id: response.id,
                author: response.author,
                title: response.title,
                date: response.date,
                description: response.description,
                picture: response.picture
            };

            return mappedArticle;
        } catch (error) {
            return "message: something error while getting the article";
        }
    }

    async findAll(): Promise<object | string> {
        try {
            const response = await this.ArticleRepository
                .createQueryBuilder("article")
                .getMany();

            const mappingArticle = response.map((article) => {
                return {
                    id: article.id,
                    author: article.author,
                    title: article.title,
                    date: article.date,
                    picture: article.picture
                }
            });

            return mappingArticle;
        } catch (error) {
            return "message: something error while getting all articles";
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
}
