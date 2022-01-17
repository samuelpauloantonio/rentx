import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

@Entity('users')
export class UsersEntites {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @Expose()
    avatar_url?(): string {
        switch (process.env.Disk) {
            case 'local':
                return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
            case 's3':
                return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
            default:
                return null;
        }
    }

    @CreateDateColumn()
    created_at?: Date;
}
