import { v4 as uuidvd } from 'uuid';

class Specification {
    id: string;

    name: string;

    description: string;

    created_At: Date;

    constructor() {
        this.id = uuidvd();
        this.created_At = new Date();
    }
}
export default Specification;
