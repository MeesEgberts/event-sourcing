import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllInvoicesQuery } from '../impl/find-all-invoices.query';
import { InvoiceReadModel } from '../../../domain/read-models/invoice.read-model';
import { FindInvoiceRepository } from '../../ports/find-invoice.repository';

@QueryHandler(FindAllInvoicesQuery)
export class FindAllInvoicesQueryHandler
  implements IQueryHandler<FindAllInvoicesQuery, InvoiceReadModel[]>
{
  constructor(private readonly repository: FindInvoiceRepository) {}

  async execute(query: FindAllInvoicesQuery) {
    return this.repository.findAll();
  }
}
