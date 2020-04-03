import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    game_id: number;

    @Column()
    role: number;

    @Column()
    account: number;

    @Column()
    create_time: string;

    @Column()
    created_by: string;

    @Column()
    update_time: string;

    @Column()
    updated_by: string;
}