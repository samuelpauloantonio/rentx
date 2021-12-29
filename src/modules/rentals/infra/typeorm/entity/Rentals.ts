import { Car } from '@modules/cars/infra/typeorm/entities/car';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('rentals')
export class Rental {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    car_id: string;

    @Column('uuid')
    user_id: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @ManyToOne(() => Car)
    @JoinColumn({ name: 'car_id' })
    car: [];

    @Column('numeric')
    total: number;

    @Column()
    expected_return_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}
