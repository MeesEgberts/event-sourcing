import { VersionedAggregateRoot } from '../../shared/domain/aggregate-root';
import { InvoicePaidEvent } from './events/invoice-paid.event';

export class Invoice extends VersionedAggregateRoot {
  public customerId: string;
  public amount: number;
  public paid: boolean;

  constructor(public id: string) {
    super();
  }

  pay() {
    this.apply(new InvoicePaidEvent(this.id));
  }

  [`on${InvoicePaidEvent.name}`](event: InvoicePaidEvent) {
    if (this.paid) {
      throw new Error('Invoice already paid');
    }

    this.paid = true;
  }
}
