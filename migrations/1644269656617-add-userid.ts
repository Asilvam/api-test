import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserid1644269656617 implements MigrationInterface {
    name = 'addUserid1644269656617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "id" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_cace4a159ff9f2512dd42373760" TO "PK_d72ea127f30e21753c9e229891e"`);
        await queryRunner.query(`ALTER SEQUENCE "user_id_seq" RENAME TO "user_userId_seq"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER SEQUENCE "user_userId_seq" RENAME TO "user_id_seq"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "PK_d72ea127f30e21753c9e229891e" TO "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "userId" TO "id"`);
    }

}
