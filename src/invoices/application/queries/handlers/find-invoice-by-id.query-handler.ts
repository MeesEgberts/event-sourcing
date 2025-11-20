import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindInvoiceByIdQuery } from '../impl/find-invoice-by-id.query';
import { InvoiceReadModel } from '../../../domain/read-models/invoice.read-model';
import { FindInvoiceRepository } from '../../ports/find-invoice.repository';

@QueryHandler(FindInvoiceByIdQuery)
export class FindInvoiceByIdQueryHandler
  implements IQueryHandler<FindInvoiceByIdQuery, InvoiceReadModel | null>
{
  constructor(private readonly repository: FindInvoiceRepository) {}

  async execute(query: FindInvoiceByIdQuery) {
    return this.repository.findById(query.id);
  }
}
