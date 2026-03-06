import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';
import { TicketStatus } from 'src/common/enums';

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
  
  @ManyToOne(() => User, user => user.tickets)
  user: User;
  
  @CreateDateColumn({type:'timestamptz'})
  createdAt: Date

  @CreateDateColumn({type:'timestamptz'})
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date;
}
