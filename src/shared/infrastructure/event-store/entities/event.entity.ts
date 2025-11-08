import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity('events')
@Index(['streamId', 'position'], { unique: true })
export class EventEntity {
  @PrimaryColumn()
  streamId: string;

  @PrimaryColumn()
  position: number;

  @Column()
  type: string;

  @Column('json')
  data: Record<string, any>;

  @Column('text', { nullable: true })
  userId?: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;
}
