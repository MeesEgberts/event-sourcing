import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from '../presentation/http/invoices.controller';
import { CreateInvoiceCommandHandler } from './commands/handlers/create-invoice.command-handler';
import { InvoiceInfrastructureModule } from '../infrastructure/invoice-infrastructure.module';
import { InvoiceFactory } from '../domain/factories/invoice.factory';
import { InvoiceCreatedEventHandler } from './event-handlers/invoice-created.event-handler';
import { FindInvoiceByIdQueryHandler } from './queries/handlers/find-invoice-by-id.query-handler';
import { FindAllInvoicesQueryHandler } from './queries/handlers/find-all-invoices.query-handler';

@Module({
  imports: [InvoiceInfrastructureModule],
  controllers: [InvoicesController],
  providers: [
    InvoicesService,

    // Factories
    InvoiceFactory,

    // Command Handlers
    CreateInvoiceCommandHandler,

    // Query Handlers
    FindInvoiceByIdQueryHandler,
    FindAllInvoicesQueryHandler,

    // Event Handlers
    InvoiceCreatedEventHandler,
  ],
})
export class InvoicesModule {}
