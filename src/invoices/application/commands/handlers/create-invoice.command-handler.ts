import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInvoiceCommand } from '../impl/create-invoice.command';

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceCommandHandler
  implements ICommandHandler<CreateInvoiceCommand>
{
  private readonly logger = new Logger(CreateInvoiceCommandHandler.name);

  constructor() {}

  async execute(command: CreateInvoiceCommand) {
    this.logger.debug(
      `Processing "${CreateInvoiceCommand.name}": ${JSON.stringify(command)}`,
    );

    // ...
  }
}
