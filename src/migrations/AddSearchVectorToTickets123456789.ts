import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSearchVectorToTickets123456789 implements MigrationInterface {
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Create the tsvector column with weights
        // 'A' weight for Title (high priority), 'B' weight for Description (lower priority)
        await queryRunner.query(`
            ALTER TABLE "ticket" ADD COLUMN "searchVector" tsvector 
            GENERATED ALWAYS AS (
                setweight(to_tsvector('english', coalesce(title, '')), 'A') || 
                setweight(to_tsvector('english', coalesce(description, '')), 'B')
            ) STORED;
        `);

        // 2. Create the GIN (Generalized Inverted Index) for fast searching
        await queryRunner.query(`
            CREATE INDEX "IDX_TICKET_SEARCH" ON "ticket" USING GIN ("searchVector");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Reverse the changes: Drop the index first, then the column
        await queryRunner.query(`DROP INDEX "IDX_TICKET_SEARCH"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "searchVector"`);
    }
}