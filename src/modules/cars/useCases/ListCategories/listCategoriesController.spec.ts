import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { Connection } from 'typeorm';
import createConnetionDb from '@shared/infra/typeorm';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

let connection: Connection;

describe('List Category', () => {
    beforeAll(async () => {
        connection = await createConnetionDb();
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

    it('Should be able to list all category', async () => {
        const { body } = await request(app).post('/sessions').send({
            email: 'admin@rentx.com',
            password: 'admin',
        });

        await request(app)
            .post('/categories')
            .send({
                name: 'category supertest',
                description: 'description supertest',
            })
            .set({
                Authorization: `Bearer ${body.token}`,
            });

        await request(app)
            .post('/categories')
            .send({
                name: 'category supertes2',
                description: 'description supertes2',
            })
            .set({
                Authorization: `Bearer ${body.token}`,
            });
        const response = await request(app)
            .get('/categories')
            .set({
                Authorization: `Bearer ${body.token}`,
            });

        expect(response.body[0]).toHaveProperty('id');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });
});
