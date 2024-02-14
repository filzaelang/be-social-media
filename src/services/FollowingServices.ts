import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Following } from "../entity/Following";
import { User } from "../entity/User";

export default new class FollowingServices {
    private readonly FollowingRepository: Repository<Following> = AppDataSource.getRepository(Following);

    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User);

    async findFollowing(ourId: number): Promise<object | string> {
        try {
            const response = await this.FollowingRepository.find({
                where: {
                    follower_id: {
                        id: ourId
                    }
                }
            })

            return {
                message: "success getting all following",
                data: response
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findFollower(ourId: number): Promise<object | string> {
        try {
            const response = await this.FollowingRepository.find({
                where: {
                    following_id: {
                        id: ourId
                    }
                }
            })

            return {
                message: "success getting all follower",
                data: response
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async create(data: Following): Promise<object | string> {
        try {
            const checkFollow = await this.FollowingRepository.count({
                where: {
                    following_id: {
                        id: data.following_id.id
                    },
                    follower_id: {
                        id: data.follower_id.id
                    }
                }
            });

            if (checkFollow > 0) {
                throw new Error("You already follow this person !");
            }

            if (data.following_id === data.follower_id) {
                throw new Error("You can't follow yourself !");
            }

            const checkUser = await this.UserRepository.count({
                where: {
                    id: data.following_id.id
                }
            });

            if (checkUser <= 0) {
                throw new Error("User doesn't exist");
            }

            const follow = await this.FollowingRepository.save({
                ...data,
                created_at: new Date(),
                updated_at: new Date()
            });

            return {
                message: "Following",
                data: follow
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id: number): Promise<object | string> {
        try {
            const response = await this.FollowingRepository.delete(id);
            return {
                message: "You unfollowed this person !",
                data: response
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}