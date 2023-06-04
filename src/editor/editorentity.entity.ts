import { AdminEntity } from 'src/admin/adminentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("editor")
export class EditorEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contact: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  filename: string;

}