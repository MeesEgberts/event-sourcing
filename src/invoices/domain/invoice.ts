import { VersionedAggregateRoot } from '../../shared/domain/aggregate-root';
import { InvoicePaidEvent } from './events/invoice-paid.event';
import { InvoiceCreatedEvent } from './events/invoice-created.event';

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

  [`on${InvoiceCreatedEvent.name}`](event: InvoiceCreatedEvent) {
    this.customerId = event.customerId;
    this.amount = event.amount;
  }

  [`on${InvoicePaidEvent.name}`](event: InvoicePaidEvent) {
    if (this.paid) {
      throw new Error('Invoice already paid');
    }

    this.paid = true;
  }
}
