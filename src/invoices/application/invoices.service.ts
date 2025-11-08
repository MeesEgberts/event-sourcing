import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../presentation/http/dto/create-invoice.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateInvoiceCommand } from './commands/impl/create-invoice.command';

@Injectable()
export class InvoicesService {
  constructor(private readonly commandBus: CommandBus) {}

  create(dto: CreateInvoiceDto) {
    return this.commandBus.execute(
      new CreateInvoiceCommand(dto.customerId, dto.amount),
    );
  }
}
