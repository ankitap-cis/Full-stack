import { IsStrongPassword } from 'class-validator';
// import { Roles } from 'src/roles/decorator';
// import { Role } from 'src/roles/enum';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';



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

  @Column({default:'user'})
  roles:string;


  @Column({default: false})
  isVerified : boolean;

  @Column({nullable:true})
  verificationToken:string;

  @BeforeInsert()
  async hashPasswordAndValidate() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  
}
