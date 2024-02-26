import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Repository, FindManyOptions, Like } from "typeorm";

export default new class UserSevices {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)

    async find(reqBody: any): Promise<object | string> {
        try {
            const user = await this.UserRepository.find({
                where: [
                    { username: Like(`%${reqBody.username}%`) },
                    { full_name: Like(`%${reqBody.username}%`) },
                ],
            } as FindManyOptions<User>);

            return user.map((data) => ({
                id: data.id,
                username: data.username,
                full_name: data.full_name,
                email: data.email,
                photo_profile: data.photo_profile,
                description: data.description,
                follower: data.follower,
                following: data.following,
            }))

        } catch (error) {
            throw new Error(error.message);
        }
    }
}