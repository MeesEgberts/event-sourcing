import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PayInvoiceCommand } from '../impl/pay-invoice.command';
import { Logger } from '@nestjs/common';
import { AggregateRehydrator } from '../../../../shared/application/aggregate-rehydrator';
import { Invoice } from '../../../domain/invoice';

@CommandHandler(PayInvoiceCommand)
export class PayInvoiceCommandHandler
  implements ICommandHandler<PayInvoiceCommand>
{
  private readonly logger = new Logger(PayInvoiceCommandHandler.name);

  constructor(private readonly aggregateRehydrator: AggregateRehydrator) {}

  async execute(command: PayInvoiceCommand) {
    this.logger.debug(
      `Processing "${PayInvoiceCommand.name}": ${JSON.stringify(command)}`,
    );

    const invoice = await this.aggregateRehydrator.rehydrate(
      command.id,
      Invoice,
    );

    invoice.pay();
    invoice.commit();

    return invoice;
  }
}
