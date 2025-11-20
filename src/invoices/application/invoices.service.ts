import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../presentation/http/dto/create-invoice.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateInvoiceCommand } from './commands/impl/create-invoice.command';
import { FindInvoiceByIdQuery } from './queries/impl/find-invoice-by-id.query';
import { FindAllInvoicesQuery } from './queries/impl/find-all-invoices.query';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(dto: CreateInvoiceDto) {
    return this.commandBus.execute(
      new CreateInvoiceCommand(dto.customerId, dto.amount),
    );
  }

  findAll() {
    return this.queryBus.execute(new FindAllInvoicesQuery());
  }

  findOne(id: string) {
    return this.queryBus.execute(new FindInvoiceByIdQuery(id));
  }
}
