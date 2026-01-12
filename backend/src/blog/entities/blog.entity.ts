import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string; 

    @Column()
    content: string;

    @Column()
    image: string;
    
    @Column()
    author: string;
}
