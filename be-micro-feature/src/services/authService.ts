import { Repository } from "typeorm"
import { user } from "../entity/user"
import { AppDataSource } from "../data-source"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

export default new class AuthServices {
    private readonly AuthRepository : Repository<user> = AppDataSource.getRepository(user)

    async register(reqBody: any) : Promise<object | string> {
        try {
            const checkEmail = await this.AuthRepository.count({ where: { email: reqBody?.email }})
            if(checkEmail > 0) return `Email: ${reqBody.email} is already registered`

            const hashPassword = await bcrypt.hash(reqBody?.password, 10)

            const obj = this.AuthRepository.create({
                fullName: reqBody.fullName,
                email: reqBody.email,
                password: hashPassword
            })
            const resRegist = await this.AuthRepository.save(obj);

            return {
                message: "success",
                data: resRegist
            };
        } catch(error) {
            throw error;
        }
    }
    async login(reqBody: any) : Promise<object | string> {
        try{
            const checkEmail = await this.AuthRepository.findOne({ where: { email: reqBody.email }})
            if(!checkEmail) return `Email: ${reqBody.email} isn't ready registered`

            const comparePassword = await bcrypt.compare(reqBody.password, checkEmail.password)
            if(!comparePassword) return 'password is wrong!'

            const obj = this.AuthRepository.create({
                id: checkEmail.id,
                fullName: checkEmail.fullName,
                email: checkEmail.email
            })

            const token = jwt.sign({obj}, "JUALPULAU", { expiresIn: "1h" })
        
            return {
                message: "login success",
                token,
            }
        } catch(error) {
            return "Something error while loggedin"
        }
    }
    async getAll(): Promise<object | string> {
        try {
            const response = await this.AuthRepository.find()
            return {
                message: "success get all user",
                data: response
            }
        } catch (error) {
            return "message: something error while get all user"
        }
    }

    async getOne(id: number): Promise<object | string> {
        try {
            const response = await this.AuthRepository.findOneBy({ id })
            return {
                message: "success get one user",
                data: response
            }
        } catch (error) {
            return "message: something error while get one user"
        }
    }
}
