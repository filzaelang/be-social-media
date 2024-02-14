import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1707805081456 implements MigrationInterface {
    name = 'MyMigration1707805081456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "replies" ALTER COLUMN "content" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "replies" ALTER COLUMN "content" SET NOT NULL`);
    }

}
