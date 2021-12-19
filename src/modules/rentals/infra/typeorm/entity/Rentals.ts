import { v4 as uuidv4 } from 'uuid';

export class Rental {
    id: string;

    car_id: string;

    user_id: string;

    start_date: Date;

    end_date: Date;

    total: number;

    expected_return_date: Date;

    created_at: Date;

    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
