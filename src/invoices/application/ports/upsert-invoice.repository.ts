import { DeepPartial } from 'typeorm';
import { InvoiceEntity } from '../../infrastructure/persistance/entities/invoice.entity';

export abstract class UpsertInvoiceRepository {
  abstract upsert(invoice: DeepPartial<InvoiceEntity>): Promise<void>;
}
