import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Categories } from './categories';

@Entity('cars')
export class Car {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    license_plate: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    brand: string;

    @Column()
    category_id: string;

    @Column()
    fine_amount: number;

    @Column()
    available: boolean;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Categories)
    @JoinColumn({ name: 'category_id' })
    category: Categories;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
        }
    }
}
