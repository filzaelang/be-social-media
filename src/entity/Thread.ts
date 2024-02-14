import {
    Entity, Column, PrimaryGeneratedColumn, JoinColumn,
    CreateDateColumn, UpdateDateColumn,
    ManyToOne, OneToMany
} from "typeorm";
import { User } from "./User";
import { Like } from "./Like";
import { Replie } from "./Replie";

@Entity({ name: "threads" })
export class Thread {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    content: string;

    @Column({ nullable: true })
    image: string;

    @OneToMany(() => Replie, (replie) => replie.thread_id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    number_of_replies: Replie[];

    @OneToMany(() => Like, (like) => like.thread_id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    number_of_likes: Like[];

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.threads, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "created_by" })
    created_by: User;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.threads_update, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "updated_by" })
    updated_by: User;
}
