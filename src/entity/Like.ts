import {
    Entity, PrimaryGeneratedColumn, JoinColumn,
    CreateDateColumn, UpdateDateColumn, ManyToOne
} from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity({ name: "likes" })
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.likes, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "user_id" })
    user_id: User;

    @ManyToOne(() => Thread, (thread) => thread.number_of_likes, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "thread_id" })
    thread_id: Thread;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.likes_created_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "created_by" })
    created_by: User;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.likes_updated_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "updated_by" })
    updated_by: User;
}