import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Thread } from "../entity/Thread";
import cloudinary from "../libs/cloudinary";

export default new class ThreadServices {
    private readonly ThreadRepository: Repository<Thread> = AppDataSource.getRepository(Thread);

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

    async getAll(): Promise<object | string> {
        try {
            const response = await this.ThreadRepository.find({
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

            return {
                message: "success get all thread",
                data: response
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getOne(id: number): Promise<object | string> {
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

            if (response === null) {
                return {
                    mesage: "Data doesn't exist"
                }
            }

            return {
                message: "success get a thread",
                data: response
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
}