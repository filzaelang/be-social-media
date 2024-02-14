import {
    Entity, PrimaryGeneratedColumn, JoinColumn,
    CreateDateColumn, UpdateDateColumn, ManyToOne
} from "typeorm";
import { User } from "./User";


@Entity({ name: "following" })
export class Following {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.following, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "following_id" })
    following_id: User;

    @ManyToOne(() => User, (user) => user.follower, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "follower_id" })
    follower_id: User;

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.following_created_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "created_by" })
    created_by: User[];

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.following_updated_by, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "updated_by" })
    updated_by: User[];
}