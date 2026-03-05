import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ticket } from './ticket.entity';
import { UserRoles} from 'src/static';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRoles,
    default: UserRoles.USER
  })
  role: UserRoles

  @OneToMany(() => Ticket, ticket => ticket.user)
  tickets: Ticket[];
}