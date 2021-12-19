import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRentals1639945540814 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rentals',
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
                        name: 'car_id',
                        type: 'uuid',
                    },

                    {
                        name: 'user_id',
                        type: 'uuid',
                    },

                    {
                        name: 'start_date',
                        type: 'timestamp',
                        default: 'now()',
                    },

                    {
                        name: 'end_date',
                        type: 'timestamp',
                    },
                    {
                        name: 'expected_return_date',
                        type: 'timestamp',
                    },

                    {
                        name: 'total',
                        type: 'numeric',
                    },

                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                    },
                ],

                foreignKeys: [
                    {
                        name: 'FKCarRental',
                        columnNames: ['car_id'],
                        referencedTableName: 'cars',
                        referencedColumnNames: ['id'],
                        onUpdate: 'SET NULL',
                        onDelete: 'SET NULL',
                    },

                    {
                        name: 'FKUserRental',
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onUpdate: 'SET NULL',
                        onDelete: 'SET NULL',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rentals');
    }
}
