import { v4 as uuidv4 } from 'uuid';

class Categories {
    id: string;

    name: string;

    description: string;

    create_At: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
            this.create_At = new Date();
        }
    }
}
export default Categories;
