import Specification from '../infra/typeorm/entities/specification';

export interface CreateCarDTO {
    id?: string;
    name: string;
    license_plate: string;
    description: string;
    daily_rate: number;
    category_id: string;
    fine_amount: number;
    brand: string;
    specifications?: Specification[];
}
