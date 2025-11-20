import { UsersEntity } from "src/users/users.entity";
import { Column, Entity, ManyToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/browser";

@Entity({ name: 'roles' })
export class RolesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    role_name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToMany(() => UsersEntity, (user) => user.roles)
    users: UsersEntity[];
}
