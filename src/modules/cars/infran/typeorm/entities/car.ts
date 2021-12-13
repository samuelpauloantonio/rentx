import { v4 as uuidV4 } from 'uuid';

export class Car {
    id: string;

    name: string;

    description: string;

    daily_rate: number;

    category_id: string;

    license_plate: string;

    fine_amount: number;

    available: boolean;

    create_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
            this.create_at = new Date();
        }
    }
}
