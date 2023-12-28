import { Repository } from "typeorm"
import { article } from "../entity/article"
import { AppDataSource } from "../data-source"

export default new class ArticleServices {
    private readonly ArticleRepository : Repository<article> = AppDataSource.getRepository(article)

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
            })
            return {
                message: "success get all article",
                data: mappingArticle
            }
        } catch (error) {
            return "message: something error while get all article"
        }
    }
}