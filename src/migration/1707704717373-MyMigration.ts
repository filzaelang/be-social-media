import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1707704717373 implements MigrationInterface {
    name = 'MyMigration1707704717373'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "replies" ALTER COLUMN "image" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ALTER COLUMN "content" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "threads" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "threads" ALTER COLUMN "content" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "replies" ALTER COLUMN "image" SET NOT NULL`);
    }

}
