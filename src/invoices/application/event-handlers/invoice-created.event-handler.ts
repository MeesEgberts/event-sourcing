import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InvoiceCreatedEvent } from '../../domain/events/invoice-created.event';
import { Logger } from '@nestjs/common';
import { UpsertInvoiceRepository } from '../ports/upsert-invoice.repository';

@EventsHandler(InvoiceCreatedEvent)
export class InvoiceCreatedEventHandler
  implements IEventHandler<InvoiceCreatedEvent>
{
  private readonly logger = new Logger(InvoiceCreatedEventHandler.name);

  constructor(private readonly repository: UpsertInvoiceRepository) {}

  async handle(event: InvoiceCreatedEvent) {
    this.logger.debug(`${InvoiceCreatedEvent.name}: ${JSON.stringify(event)}`);

    // In a real-world application, we would have to ensure that this operation is atomic.
    // with the creation of the sample. Otherwise, we could end up with a sample that is not reflected
    // in the read model (e.g. because the database operation fails).
    // For more information, check out the" Transactional inbox / outbox "pattern."
    await this.repository.upsert({
      id: event.id,
      customerId: event.customerId,
      amount: event.amount,
    });
  }
}
