import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCars1639323598116 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'cars',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },

                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'license_plate',
                        type: 'varchar',
                    },
                    {
                        name: 'daily_rate',
                        type: 'numeric',
                    },

                    {
                        name: 'brand',
                        type: 'varchar',
                    },
                    {
                        name: 'available',
                        type: 'boolean',
                        default: true,
                    },

                    {
                        name: 'fine_amount',
                        type: 'numeric',
                    },
                    {
                        name: 'category_id',
                        type: 'uuid',
                        isNullable: true,
                    },

                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKCategoryCar',
                        referencedColumnNames: ['id'],
                        referencedTableName: 'categories',
                        columnNames: ['category_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars');
    }
}
