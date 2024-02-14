import {
    Entity, Column, PrimaryGeneratedColumn, JoinColumn,
    CreateDateColumn, UpdateDateColumn, ManyToOne
} from "typeorm";
import { User } from "./User";
import { Thread } from "./Thread";

@Entity({ name: "replies" })
export class Replie {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.replies, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "user_id" })
    user_id: User;

    @ManyToOne(() => Thread, (thread) => thread.number_of_replies, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "thread_id" })
    thread_id: Thread;

    @Column({ nullable: true })
    image: string;

    @Column({ nullable: true })
    content: string;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.replies_created_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "created_by" })
    created_by: User;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.replies_updated_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "updated_by" })
    updated_by: User;
}
