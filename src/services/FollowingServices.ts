import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Following } from "../entity/Following";
import { User } from "../entity/User";

export default new class FollowingServices {
    private readonly FollowingRepository: Repository<Following> = AppDataSource.getRepository(Following);

    private readonly UserRepository: Repository<User> = AppDataSource.getRepository(User);

    // async findMyFollowing(ourId: number): Promise<object | string> {
    //     try {
    //         const checkFollowing = await this.FollowingRepository.count({
    //             where: {
    //                 follower_id: {
    //                     id: ourId
    //                 }
    //             }
    //         })

    //         if (checkFollowing <= 0) {
    //             return { message: "You have 0 Following" }
    //         }

    //         const response = await this.FollowingRepository.find({
    //             where: {
    //                 follower_id: {
    //                     id: ourId
    //                 }
    //             }
    //         })

    //         return {
    //             message: "success getting all following",
    //             data: response
    //         }
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // async findMyFollower(ourId: number): Promise<object | string> {
    //     try {
    //         const checkFollower = await this.FollowingRepository.count({
    //             where: {
    //                 following_id: {
    //                     id: ourId
    //                 }
    //             }
    //         })

    //         if (checkFollower <= 0) {
    //             return { message: "You have 0 Follower" }
    //         }

    //         const response = await this.FollowingRepository.find({
    //             where: {
    //                 following_id: {
    //                     id: ourId
    //                 }
    //             }
    //         })

    //         return {
    //             message: "success getting all follower",
    //             data: response
    //         }
    //     } catch (error) {
    //         throw new Error(error.message)
    //     }
    // }

    async find(
        loginSession: any,
        queryType?: string,
        queryLimit?: number
    ): Promise<any> {
        try {
            let follows: Following[];

            if (queryType === "followers") {
                follows = await this.FollowingRepository.find({
                    take: queryLimit,
                    where: {
                        following_id: {
                            id: loginSession.obj.id,
                        },
                    },
                    relations: ["follower_id"],
                    select: {
                        follower_id: {
                            id: true,
                            username: true,
                            full_name: true,
                            email: true,
                            photo_profile: true,
                            description: true,
                        }
                    }
                })

                return await Promise.all(
                    follows.map(async (data) => {
                        const isFollowed = await this.FollowingRepository.count({
                            where: {
                                follower_id: {
                                    id: loginSession.obj.id,
                                },
                                following_id: {
                                    id: data.follower_id.id,
                                },
                            },
                        });

                        return {
                            id: data.id,
                            follower_id: data.follower_id?.id,
                            username: data.follower_id?.username,
                            full_name: data.follower_id?.full_name,
                            email: data.follower_id?.email,
                            photo_profile: data.follower_id?.photo_profile,
                            description: data.follower_id?.description,
                            is_followed: isFollowed > 0,
                        };
                    })
                );
            } else if (queryType === "followings") {
                follows = await this.FollowingRepository.find({
                    take: queryLimit,
                    where: {
                        follower_id: {
                            id: loginSession.obj.id
                        },
                    },
                    relations: ["following_id"]
                })

                return await Promise.all(
                    follows.map(async (data) => {
                        const isFollowed = await this.FollowingRepository.count({
                            where: {
                                follower_id: {
                                    id: loginSession.obj.id,
                                },
                                following_id: {
                                    id: data.following_id.id,
                                },
                            },
                        });

                        return {
                            id: data.id,
                            following_id: data.following_id.id,
                            username: data.following_id.username,
                            full_name: data.following_id.full_name,
                            email: data.following_id.email,
                            photo_profile: data.following_id.photo_profile,
                            description: data.following_id.description,
                            is_followed: isFollowed > 0,
                        };
                    })
                );
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(data: Following, loginSession: any, reqBody: any): Promise<object | string> {
        try {
            const checkFollow = await this.FollowingRepository.count({
                where: {
                    following_id: {
                        id: reqBody.following_id
                    },
                    follower_id: {
                        id: loginSession.obj.id
                    }
                }
            });

            if (checkFollow > 0) {
                throw new Error("You already follow this person !");
            }

            const a = reqBody.following_id
            const b = loginSession.obj.id

            if (a == b) {
                throw new Error("You can't follow yourself !");
            }

            const checkUser = await this.UserRepository.count({
                where: {
                    id: reqBody.following_id
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

    async delete(id: number, loginSession: any): Promise<object | string> {
        try {
            const checkFollow = await this.FollowingRepository.findOne({
                where: {
                    following_id: {
                        id: id,
                    },
                    follower_id: {
                        id: loginSession.obj.id
                    }
                }
            })


            if (!checkFollow) {
                throw new Error("You didn't follow this person")
            }

            const response = await this.FollowingRepository.delete({
                id: checkFollow.id
            })

            return {
                message: "You unfollowed this person !",
                data: response
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}