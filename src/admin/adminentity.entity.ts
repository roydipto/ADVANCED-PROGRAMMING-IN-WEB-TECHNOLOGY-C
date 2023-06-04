// import { AuthorEntity } from 'src/author/authorentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("admin")
export class AdminEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contact: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  filename: string;

}