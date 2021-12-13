import { hash } from 'bcrypt';
import { createConnection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

async function createUser() {
    const connectionDB = await createConnection();

    const id = uuidV4();
    const password = await hash('admin', 8);
    connectionDB.query(`
    INSERT INTO USERS(id, name , email ,  password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXX')
    `);
}

createUser().then(() => console.log('User admin created!'));
