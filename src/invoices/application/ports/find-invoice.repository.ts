import { InvoiceReadModel } from '../../domain/read-models/invoice.read-model';

export abstract class FindInvoiceRepository {
  abstract findById(id: string): Promise<InvoiceReadModel | null>;
  abstract findAll(): Promise<InvoiceReadModel[]>;
}
