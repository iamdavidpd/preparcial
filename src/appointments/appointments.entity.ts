import { UsersEntity } from "../users/users.entity";
import { Column, Entity, ForeignKey, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'appointments' })
export class AppointmentsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    id_user: string;

    @Column({nullable: false})
    id_doctor: string;

    @Column({type: 'timestamptz', nullable: false})
    datetime: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => UsersEntity, (user) => user.appoints)
    user: UsersEntity;
}
