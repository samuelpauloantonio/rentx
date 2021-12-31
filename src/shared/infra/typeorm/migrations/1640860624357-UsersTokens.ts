import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UsersTokens1640860624357 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_token',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                    },

                    {
                        name: 'refresh_token',
                        type: 'varchar',
                    },

                    {
                        name: 'user_id',
                        type: 'uuid',
                    },
                    {
                        name: 'expires_date',
                        type: 'timestamp',
                    },

                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],

                foreignKeys: [
                    {
                        name: 'FKUsersToken',
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_token');
    }
}
