import {
    Column,
    CreateDateColumn,
    Entity,
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
