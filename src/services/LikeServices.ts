import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Like } from "../entity/Like";
import { throws } from "assert";

export default new class LikeServices {
    private readonly LikeRepository: Repository<Like> = AppDataSource.getRepository(Like);

    async create(data: Like): Promise<object | string> {
        try {

            const checkLike = await this.LikeRepository.exists({
                where: {
                    user_id: {
                        id: data.user_id.id
                    },
                    thread_id: {
                        id: data.thread_id.id
                    }
                },
                relations: ["user_id", "thread_id"]
            })

            if (checkLike) {
                throw new Error("You already liked this thread !");
            }

            const newLike = await this.LikeRepository.save({
                ...data,
                created_at: new Date(),
                updated_at: new Date()
            });

            return {
                message: "You liked this thread !",
                data: newLike
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id: number, loginSession: any): Promise<object | string> {
        try {
            const checkLike = await this.LikeRepository.findOne({
                where: {
                    thread_id: {
                        id: id
                    },
                    user_id: {
                        id: loginSession.obj.id
                    }
                }
            })

            if (!checkLike) {
                throw new Error("You didn't like this thread")
            }

            const response = this.LikeRepository.delete({
                id: checkLike.id
            });

            return {
                message: "You disliked this thread!",
                data: response
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}