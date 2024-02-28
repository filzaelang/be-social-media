import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Following } from "../entity/Following";
import { Repository, FindManyOptions, Like } from "typeorm";
import cloudinary from "../libs/cloudinary";

export default new class UserSevices {
    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User)
    private readonly FollowingRepository: Repository<Following> = AppDataSource.getRepository(Following);

    async find(reqBody: any, loginSession: any): Promise<object | string> {
        try {
            const user = await this.UserRepository.find({
                where: [
                    { username: Like(`%${reqBody.username}%`) },
                    { full_name: Like(`%${reqBody.username}%`) },
                ],
            } as FindManyOptions<User>);

            return await Promise.all(
                user.map(async (data) => {
                    const isFollowed = await this.FollowingRepository.count({
                        where: {
                            follower_id: {
                                id: loginSession.obj.id,
                            },
                            following_id: {
                                id: data.id,
                            },
                        },
                    });

                    return {
                        id: data.id,
                        username: data.username,
                        full_name: data.full_name,
                        email: data.email,
                        photo_profile: data.photo_profile,
                        description: data.description,
                        follower: data.follower,
                        following: data.following,
                        is_followed: isFollowed > 0,
                    }
                })
            )

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findOne(id: number, loginSession: any): Promise<object | string> {
        try {
            const user = await this.UserRepository.findOne({
                where: { id },
                relations: ["follower", "following"],
            })

            return {
                id: user.id,
                username: user.username,
                full_name: user.full_name,
                email: user.email,
                photo_profile: user.photo_profile,
                description: user.description,
                follower: user.follower || [],
                following: user.following || [],
                followers_count: (user.follower || []).length,
                following_count: (user.following || []).length,
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(reqBody: any, loginSession: any, file: any, fileName: string): Promise<object | string> {
        try {

            let image = file ? fileName : null

            if (file) {
                cloudinary.upload()
                const cloudinaryRes = await cloudinary.destination(image)
                image = cloudinaryRes.secure_url
            }

            const updateUser = this.UserRepository.create({
                username: reqBody.username,
                full_name: reqBody.full_name,
                description: reqBody.description,
                photo_profile: image,
            });

            const response = await this.UserRepository.update(loginSession.obj.id, updateUser)

            return {
                message: "Succes updating",
                data: response,
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}