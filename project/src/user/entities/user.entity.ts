import { IsStrongPassword } from 'class-validator';
import { Roles } from 'src/roles/decorator';
import { Role } from 'src/roles/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })  
  @IsStrongPassword()
  password: string;

  @Column({ type: 'enum', enum: ["m", "f", "u"] })
  gender:string;

  @Column({default:Role.User})
  roles:Role;
}
