import { Injectable } from '@nestjs/common';
import { FindInvoiceRepository } from '../../../application/ports/find-invoice.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from '../entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrmFindInvoiceRepository implements FindInvoiceRepository {
  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly repository: Repository<InvoiceEntity>,
  ) {}

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findAll() {
    return this.repository.find();
  }
}
