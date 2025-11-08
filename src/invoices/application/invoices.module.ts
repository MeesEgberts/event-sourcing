import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from '../presentation/http/invoices.controller';
import { CreateInvoiceCommandHandler } from './commands/handlers/create-invoice.command-handler';

@Module({
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    // add the command handler as a provider
    CreateInvoiceCommandHandler,
  ],
})
export class InvoicesModule {}
