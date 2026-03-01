import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { TicketStatus } from 'src/static';
import { Transform } from 'class-transformer';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({default: TicketStatus.OPEN})
  status: TicketStatus;
  
  @Column({
    default: false
  })
  isDeleted: boolean;

  @ManyToOne(() => User, user => user.tickets)
  user: User;

  @CreateDateColumn({type:'timestamptz'})
  createdAt: Date

  @CreateDateColumn({type:'timestamptz'})
  updatedAt: Date
}
