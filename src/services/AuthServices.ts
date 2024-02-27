import { AppDataSource } from "../data-source";
import { Repository, FindManyOptions } from "typeorm";
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

            if (usernameCheck > 0) {
                throw new Error(`Username already used`);
            }

            const emailCheck = await this.AuthRepository.count({
                where: { email: data.email },
            });

            if (emailCheck > 0) {
                throw new Error(`Email already registered`);
            }


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
            const idCheck = await this.AuthRepository.findOne({
                where: [
                    { username: data.username },
                    { email: data.username },
                ],
                relations: ["follower", "following"]
            } as FindManyOptions<User>);
            if (!idCheck) {
                throw new Error("Username or email does not exist");
            }

            const comparePassword = await bcrypt.compare(data.password, idCheck.password);
            if (!comparePassword) {
                throw new Error("Password & email/username doesn't match !")
            }

            const obj = {
                id: idCheck.id,
                username: idCheck.username,
                full_name: idCheck.full_name,
                email: idCheck.email,
                photo_profile: idCheck.photo_profile,
                description: idCheck.description,
                followers_count: idCheck.follower.length,
                following_count: idCheck.following.length
            };

            const token = jwt.sign({ obj }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            return {
                message: `Login success`,
                token,
                obj
            };
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async check(loginSession: any): Promise<any> {
        try {
            const check = await this.AuthRepository.findOne({
                where: {
                    id: loginSession.obj.id
                },
                relations: ["follower", "following"]
            })

            return {
                message: "Token is valid!",
                check: {
                    id: check.id,
                    username: check.username,
                    full_name: check.full_name,
                    email: check.email,
                    photo_profile: check.photo_profile,
                    description: check.description,
                    followers_count: check.follower.length,
                    following_count: check.following.length
                },
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

}