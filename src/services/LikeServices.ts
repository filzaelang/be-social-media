import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Like } from "../entity/Like";

export default new class LikeServices {
    private readonly LikeRepository: Repository<Like> = AppDataSource.getRepository(Like);

    async create(data: Like): Promise<object | string> {
        try {

            const checkLike = await this.LikeRepository.count({
                where: {
                    user_id: {
                        id: data.user_id.id
                    },
                    thread_id: {
                        id: data.thread_id.id
                    }
                }
            })

            if (checkLike > 0) {
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

    async delete(id: number): Promise<object | string> {
        try {
            const response = this.LikeRepository.delete(id);
            return {
                message: "You disliked this thread!",
                data: response
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}