import {
    Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany
} from "typeorm"
import { Thread } from "./Thread"
import { Like } from "./Like";
import { Replie } from "./Replie";
import { Following } from "./Following";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    username: string;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    photo_profile: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Thread, (thread) => thread.created_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    threads: Thread[];

    @OneToMany(() => Thread, (thread) => thread.updated_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    threads_update: Thread[];

    @OneToMany(() => Like, (like) => like.user_id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    likes: Like[];

    @OneToMany(() => Like, (like) => like.created_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    likes_created_by: Like[];

    @OneToMany(() => Like, (like) => like.updated_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    likes_updated_by: Like[];

    @OneToMany(() => Replie, (replie) => replie.user_id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    replies: Replie[];

    @OneToMany(() => Replie, (replie) => replie.created_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    replies_created_by: Replie[];

    @OneToMany(() => Replie, (replie) => replie.updated_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    replies_updated_by: Replie[];

    @OneToMany(() => Following, (following) => following.follower_id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    follower: Following[];

    @OneToMany(() => Following, (following) => following.following_id, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    following: Following[];

    @OneToMany(() => Following, (following) => following.created_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    following_created_by: Following[];

    @OneToMany(() => Following, (following) => following.updated_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    following_updated_by: Following[];

    @CreateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP"
    })
    created_at: Date;

    @UpdateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updated_at: Date;

}
