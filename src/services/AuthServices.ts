import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

export default new class AuthServices {
    private readonly AuthRepository: Repository<User> = AppDataSource.getRepository(User);

    async register(data: User): Promise<object | string> {
        try {
            const usernameCheck = await this.AuthRepository.count({
                where: { username: data.username },
            });
            if (usernameCheck > 0) return { message: `Username already used` };

            const hashPassword = await bcrypt.hash(data.password, 10);

            const obj = await this.AuthRepository.create({
                ...data,
                password: hashPassword,
                created_at: new Date(),
                updated_at: new Date()
            });

            const response = await this.AuthRepository.save(obj);

            return {
                message: "success creating a User",
                data: response
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async login(data: User): Promise<object | string> {
        try {
            const idCheck = await this.AuthRepository.findOneBy({
                username: data.username
            });
            if (!idCheck) return { message: "Username did not exist" };

            const comparePassword = bcrypt.compare(data.password, idCheck.password);
            if (!comparePassword) return "password is wrong!";

            const obj = this.AuthRepository.create({
                id: idCheck.id,
                username: idCheck.username,
                full_name: idCheck.full_name,
                email: idCheck.email,
                photo_profile: idCheck.photo_profile
            });

            const token = jwt.sign({ obj }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            return {
                message: `Login is success`,
                token
            };
        } catch (error) {
            throw new Error(error.message)
        }
    }

}