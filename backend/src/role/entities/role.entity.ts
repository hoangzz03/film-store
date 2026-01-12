import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity({name: 'roles'})
export class Role {
    @PrimaryGeneratedColumn()
      id: number;
        
    @Column()
    name: string;

    @OneToMany(() => User, user => user.role)
    users: User[];
}
