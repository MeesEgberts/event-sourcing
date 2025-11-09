import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from '../presentation/http/invoices.controller';
import { CreateInvoiceCommandHandler } from './commands/handlers/create-invoice.command-handler';
import { InvoiceInfrastructureModule } from '../infrastructure/invoice-infrastructure.module';
import { InvoiceFactory } from '../domain/factories/invoice.factory';

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

    // Event Handlers
  ],
})
export class InvoicesModule {}
