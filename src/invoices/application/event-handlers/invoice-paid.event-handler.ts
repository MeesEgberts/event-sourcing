import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InvoicePaidEvent } from '../../domain/events/invoice-paid.event';
import { Logger } from '@nestjs/common';
import { UpsertInvoiceRepository } from '../ports/upsert-invoice.repository';

@EventsHandler(InvoicePaidEvent)
export class InvoicePaidEventHandler
  implements IEventHandler<InvoicePaidEvent>
{
  private readonly logger = new Logger(InvoicePaidEventHandler.name);

  constructor(private readonly repository: UpsertInvoiceRepository) {}

  async handle(event: InvoicePaidEvent) {
    // In a real-world application, we would have to ensure that this operation is atomic.
    // with the creation of the sample. Otherwise, we could end up with a sample that is not reflected
    // in the read model (e.g. because the database operation fails).
    // For more information, check out the" Transactional inbox / outbox "pattern."
    await this.repository.upsert({
      id: event.id,
      paid: true,
    });
  }
}
