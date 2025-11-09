import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Invoice } from '../invoice';
import { InvoiceCreatedEvent } from '../events/invoice-created.event';

@Injectable()
export class InvoiceFactory {
  create(customerId: string, amount: number) {
    const id = randomUUID();

    const invoice = new Invoice(id);

    invoice.customerId = customerId;
    invoice.amount = amount;

    // skip the handler because we don't want we've already assigned the properties.
    invoice.apply(new InvoiceCreatedEvent(id, customerId, amount), {
      skipHandler: true,
    });

    return invoice;
  }
}
