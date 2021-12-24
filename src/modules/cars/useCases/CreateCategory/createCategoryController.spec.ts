import { app } from '@shared/infra/http/app';
import request from 'supertest';
import { hash } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import CreateConnectionDb from '@shared/infra/typeorm';
import { Connection } from 'typeorm';

let connection: Connection;

describe('Create category controller', () => {
    beforeAll(async () => {
        connection = await CreateConnectionDb();
        await connection.runMigrations();
        const id = uuidV4();
        const password = await hash('admin', 8);

        await connection.query(`
        INSERT INTO USERS(id, name , email ,  password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')
        `);
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('Should be able to create a new category car ', async () => {
        const { body } = await request(app).post('/sessions').send({
            email: 'admin@rentx.com',
            password: 'admin',
        });

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'category super test',
                description: 'descriptions supertest',
            })
            .set({
                Authorization: `Bearer ${body.token}`,
            });

        expect(response.status).toBe(201);
    });

    it('should not be able to create a new category if it already exists', async () => {
        const { body } = await request(app).post('/sessions').send({
            email: 'admin@rentx.com',
            password: 'admin',
        });

        const response = await request(app)
            .post('/categories')
            .send({
                name: 'category super test',
                description: 'descriptions supertest',
            })
            .set({
                Authorization: `Bearer ${body.token}`,
            });

        expect(response.status).toBe(400);
    });
});
