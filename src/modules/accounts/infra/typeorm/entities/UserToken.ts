import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { UsersEntites } from './Users';

@Entity('users_token')
export class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    refresh_token: string;

    @Column()
    user_id: string;

    @ManyToOne(() => UsersEntites)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntites;

    @Column()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
