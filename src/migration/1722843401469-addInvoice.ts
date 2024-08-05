import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInvoice1722843401469 implements MigrationInterface {
    name = 'AddInvoice1722843401469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invoice" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_invoice" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_f8e849201da83b87f78c7497dde" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_invoice"("id", "name", "userId") SELECT "id", "name", "userId" FROM "invoice"`);
        await queryRunner.query(`DROP TABLE "invoice"`);
        await queryRunner.query(`ALTER TABLE "temporary_invoice" RENAME TO "invoice"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoice" RENAME TO "temporary_invoice"`);
        await queryRunner.query(`CREATE TABLE "invoice" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "invoice"("id", "name", "userId") SELECT "id", "name", "userId" FROM "temporary_invoice"`);
        await queryRunner.query(`DROP TABLE "temporary_invoice"`);
        await queryRunner.query(`DROP TABLE "invoice"`);
    }

}
