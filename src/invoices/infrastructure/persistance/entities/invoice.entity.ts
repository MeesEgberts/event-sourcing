import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('invoices')
export class InvoiceEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  customerId: string;

  @Column()
  amount: number;

  @Column({ default: false })
  paid: boolean;
}
