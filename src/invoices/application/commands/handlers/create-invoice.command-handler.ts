import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateInvoiceCommand } from '../impl/create-invoice.command';
import { InvoiceFactory } from '../../../domain/factories/invoice.factory';

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceCommandHandler
  implements ICommandHandler<CreateInvoiceCommand>
{
  private readonly logger = new Logger(CreateInvoiceCommandHandler.name);

  constructor(
    private readonly invoiceFactory: InvoiceFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateInvoiceCommand) {
    this.logger.debug(
      `Processing "${CreateInvoiceCommand.name}": ${JSON.stringify(command)}`,
    );

    const invoice = this.invoiceFactory.create(
      command.customerId,
      command.amount,
    );

    // Merge the invoice with the event publisher to enable event handling
    this.eventPublisher.mergeObjectContext(invoice);

    invoice.commit();

    return invoice;
  }
}
