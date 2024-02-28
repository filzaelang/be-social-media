import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Thread } from "../entity/Thread";
import { Like } from "../entity/Like";
import cloudinary from "../libs/cloudinary";


export default new class ThreadServices {
    private readonly ThreadRepository: Repository<Thread> = AppDataSource.getRepository(Thread);
    private readonly LikeRepository: Repository<Like> = AppDataSource.getRepository(Like);

    async create(data: Thread): Promise<object | string> {
        try {
            const response = this.ThreadRepository.save({
                ...data,
                created_at: new Date(),
                updated_at: new Date()
            });

            return {
                message: "success creating a new thread",
                data: response
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id: number, data: Thread): Promise<object | string> {
        try {

            if (data.image) {
                cloudinary.upload();
                const cloudinaryRes = await cloudinary.destination(data.image);

                const obj = {
                    ...data,
                    image: cloudinaryRes.secure_url,
                };

                const response = await this.ThreadRepository.update(id, obj);
                return {
                    message: "success updating a thread",
                    data: response,
                };
            }

            const response = this.ThreadRepository.update(id, data);
            return {
                message: "success updating a thread",
                data: response
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id: number): Promise<object | string> {
        try {
            const response = this.ThreadRepository.delete(id);
            return {
                message: "success deleting a thread",
                data: response
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAll(loginSession: any): Promise<object | string> {
        try {
            const thread = await this.ThreadRepository.find({
                relations: ["number_of_replies", "number_of_likes", "created_by", "updated_by"],
                order: {
                    created_at: "DESC"
                },
                select: {
                    number_of_replies: true,
                    number_of_likes: {
                        id: true,
                        user_id: {
                            id: true
                        }
                    },
                    created_by: {
                        id: true,
                        username: true,
                        full_name: true,
                        photo_profile: true,
                    },
                    updated_by: {
                        id: true,
                        username: true,
                        full_name: true,
                        photo_profile: true,
                    }
                }
            });

            const like = await this.LikeRepository.find({
                where: {
                    user_id: {
                        id: loginSession.obj.id
                    }
                },
                relations: ["user_id", "thread_id", "created_by", "updated_by"],
                select: {
                    user_id: {
                        id: true
                    },
                    thread_id: {
                        id: true
                    },
                    created_by: {
                        id: true
                    },
                    updated_by: {
                        id: true
                    }
                }
            })

            return thread.map((data) => ({
                id: data.id,
                content: data.content,
                image: data.image,
                number_of_replies: data.number_of_replies.length,
                number_of_likes: data.number_of_likes.length,
                created_at: data.created_at,
                created_by: data.created_by,
                updated_at: data.updated_at,
                updated_by: data.updated_by,
                is_liked: like.some((likeData) => likeData.thread_id.id === data.id)
            }))
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getOne(id: number, loginSession: any): Promise<object | string> {
        try {
            const response = await this.ThreadRepository.findOne({
                where: { id },
                relations: ["number_of_replies", "number_of_likes", "created_by", "updated_by"],
                select: {
                    number_of_replies: true,
                    number_of_likes: true,
                    created_by: {
                        username: true,
                        full_name: true
                    },
                    updated_by: {
                        username: true,
                        full_name: true
                    }
                }
            })

            const userId = loginSession.obj.id
            const like = await this.LikeRepository.find({
                where: {
                    user_id: {
                        id: userId
                    }
                },
                relations: ["user_id", "thread_id", "created_by", "updated_by"],
                select: {
                    user_id: {
                        id: true
                    },
                    thread_id: {
                        id: true
                    },
                    created_by: {
                        id: true
                    },
                    updated_by: {
                        id: true
                    }
                }
            })

            const result = {
                id: response.id,
                content: response.content,
                image: response.image,
                number_of_replies: response.number_of_replies.length,
                number_of_likes: response.number_of_likes.length,
                created_at: response.created_at,
                created_by: response.created_by,
                updated_at: response.updated_at,
                updated_by: response.updated_by,
                is_liked: like.some((likeData) => likeData.thread_id.id === response.id)
            }

            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findUserThreads(loginSession: any): Promise<object | string> {
        try {
            console.log(loginSession)
            const thread = await this.ThreadRepository.find({
                where: {
                    created_by: {
                        id: loginSession.obj.id
                    }
                },
                relations: ["number_of_replies", "number_of_likes", "created_by", "updated_by"],
                order: {
                    created_at: "DESC"
                },
                select: {
                    number_of_replies: true,
                    number_of_likes: {
                        id: true,
                        user_id: {
                            id: true
                        }
                    },
                    created_by: {
                        id: true,
                        username: true,
                        full_name: true,
                        photo_profile: true,
                    },
                    updated_by: {
                        id: true,
                        username: true,
                        full_name: true,
                        photo_profile: true,
                    }
                }
            });

            const like = await this.LikeRepository.find({
                where: {
                    user_id: {
                        id: loginSession.obj.id
                    }
                },
                relations: ["user_id", "thread_id", "created_by", "updated_by"],
                select: {
                    user_id: {
                        id: true
                    },
                    thread_id: {
                        id: true
                    },
                    created_by: {
                        id: true
                    },
                    updated_by: {
                        id: true
                    }
                }
            })

            return thread.map((data) => ({
                id: data.id,
                content: data.content,
                image: data.image,
                number_of_replies: data.number_of_replies.length,
                number_of_likes: data.number_of_likes.length,
                created_at: data.created_at,
                created_by: data.created_by,
                updated_at: data.updated_at,
                updated_by: data.updated_by,
                is_liked: like.some((likeData) => likeData.thread_id.id === data.id)
            }))
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findOtherUserThreads(id: number): Promise<object | string> {
        try {
            const thread = await this.ThreadRepository.find({
                where: {
                    created_by: {
                        id: id
                    }
                },
                relations: ["number_of_replies", "number_of_likes", "created_by", "updated_by"],
                order: {
                    created_at: "DESC"
                },
                select: {
                    number_of_replies: true,
                    number_of_likes: {
                        id: true,
                        user_id: {
                            id: true
                        }
                    },
                    created_by: {
                        id: true,
                        username: true,
                        full_name: true,
                        photo_profile: true,
                    },
                    updated_by: {
                        id: true,
                        username: true,
                        full_name: true,
                        photo_profile: true,
                    }
                }
            });

            const like = await this.LikeRepository.find({
                where: {
                    user_id: {
                        id: id
                    }
                },
                relations: ["user_id", "thread_id", "created_by", "updated_by"],
                select: {
                    user_id: {
                        id: true
                    },
                    thread_id: {
                        id: true
                    },
                    created_by: {
                        id: true
                    },
                    updated_by: {
                        id: true
                    }
                }
            })

            return thread.map((data) => ({
                id: data.id,
                content: data.content,
                image: data.image,
                number_of_replies: data.number_of_replies.length,
                number_of_likes: data.number_of_likes.length,
                created_at: data.created_at,
                created_by: data.created_by,
                updated_at: data.updated_at,
                updated_by: data.updated_by,
                is_liked: like.some((likeData) => likeData.thread_id.id === data.id)
            }))
        } catch (error) {
            throw new Error(error.message)
        }
    }
}