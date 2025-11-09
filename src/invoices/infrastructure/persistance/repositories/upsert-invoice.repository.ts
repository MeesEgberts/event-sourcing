import { Injectable } from '@nestjs/common';
import { UpsertInvoiceRepository } from '../../../application/ports/upsert-invoice.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from '../entities/invoice.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class OrmUpsertInvoiceRepository implements UpsertInvoiceRepository {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly repository: Repository<InvoiceEntity>,
  ) {}

  async upsert(invoice: DeepPartial<InvoiceEntity>) {
    await this.repository.save(invoice);
  }
}
