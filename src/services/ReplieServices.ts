import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Replie } from "../entity/Replie";

export default new class RepliesServices {
    private readonly RepliesRepository: Repository<Replie> = AppDataSource.getRepository(Replie);

    async create(data: Replie): Promise<object | string> {
        try {
            const response = this.RepliesRepository.save({
                ...data,
                created_at: new Date(),
                updated_at: new Date()
            });

            return {
                message: "sucess creating a reply",
                data: response
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAll(): Promise<object | string> {
        try {
            const response = await this.RepliesRepository.find({
                relations: ["user_id", "thread_id", "created_by", "updated_by"],
                select: {
                    user_id: {
                        id: true,
                        username: true,
                        full_name: true
                    },
                    thread_id: {
                        id: true,
                        content: true,
                        image: true
                    },
                    created_by: {
                        username: true,
                        full_name: true
                    },
                    updated_by: {
                        username: true,
                        full_name: true
                    }
                }
            });

            return {
                message: "success get all replies",
                data: response
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getOne(id: number): Promise<object | string> {
        try {
            const response = await this.RepliesRepository.findOne({
                where: { id },
                select: {
                    user_id: {
                        id: true,
                        username: true,
                        full_name: true
                    },
                    thread_id: {
                        id: true,
                        content: true,
                        image: true
                    },
                    created_by: {
                        username: true,
                        full_name: true
                    },
                    updated_by: {
                        username: true,
                        full_name: true
                    }
                }
            });

            if (response === null) {
                throw new Error("Data doesn't exist")
            }

            return {
                message: "success geting a reply",
                data: response
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id: number, data: Replie): Promise<object | string> {
        try {
            const response = await this.RepliesRepository.update(id, data);
            return {
                message: "success updating a reply",
                data: response
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async delete(id: number): Promise<object | string> {
        try {
            const response = await this.RepliesRepository.delete(id)
            return {
                message: "success deleting a replie",
                data: response
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}