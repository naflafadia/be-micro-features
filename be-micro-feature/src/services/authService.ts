import { Repository } from "typeorm"
import { user } from "../entity/user"
import { AppDataSource } from "../data-source"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

export default new class AuthServices {
    private readonly AuthRepository : Repository<user> = AppDataSource.getRepository(user)

    async register(reqBody: any): Promise<object | string> {
      try {
        const { role, ...userData } = reqBody;
        const checkUsername = await this.AuthRepository.count({ where: { username: userData?.username } });
  
        if (checkUsername > 0) return `Username: ${userData.username} is already registered`;
  
        const hashPassword = await bcrypt.hash(userData?.password, 10);
  
        const obj = this.AuthRepository.create({
          ...userData,
          password: hashPassword,
          role: role || "user", // Set default role to "user" if not provided
        });
  
        const resRegist = await this.AuthRepository.save(obj);
  
        return {
          message: "success",
          data: resRegist,
        };
      } catch (error) {
        throw error;
      }
    }


    async login(reqBody: any): Promise<object | string> {
      try {
        const { username, password } = reqBody;
        const checkUser = await this.AuthRepository.findOne({ where: { username } });
  
        if (!checkUser) return `Username: ${username} isn't registered`;
  
        const comparePassword = await bcrypt.compare(password, checkUser.password);
  
        if (!comparePassword) return "Password is wrong!";
  
        const obj = this.AuthRepository.create({
          id: checkUser.id,
          username: checkUser.username,
          role: checkUser.role, // Include role in the token
        });
  
        const token = jwt.sign({ obj }, "JUALPULAU", { expiresIn: "1h" });
  
        return {
          message: "Login success",
          token,
          role: checkUser.role, // Include role in the response
        };
      } catch (error) {
        return "Something error while logging in";
      }
    }
      
    async findAll(): Promise<object | string> {
      try {
        const response = await this.AuthRepository.find();
        return {
          message: "success get all user",
          data: response,
        };
      } catch (error) {
        return "message: something error while get all user";
      }
    }

    async findOne(id: number): Promise<object | string> {
      try {
        const response = await this.AuthRepository.findOne({ where: { id } });
        return {
          message: "success get one user",
          data: response,
        };
      } catch (error) {
        return "message: something error while get one user";
      }
    }
}
