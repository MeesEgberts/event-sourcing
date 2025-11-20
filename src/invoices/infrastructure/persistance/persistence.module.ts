import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { UpsertInvoiceRepository } from '../../application/ports/upsert-invoice.repository';
import { OrmUpsertInvoiceRepository } from './repositories/upsert-invoice.repository';
import { FindInvoiceRepository } from '../../application/ports/find-invoice.repository';
import { OrmFindInvoiceRepository } from './repositories/find-invoice.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity])],
  providers: [
    {
      provide: UpsertInvoiceRepository,
      useClass: OrmUpsertInvoiceRepository,
    },
    {
      provide: FindInvoiceRepository,
      useClass: OrmFindInvoiceRepository,
    },
  ],
  exports: [UpsertInvoiceRepository, FindInvoiceRepository],
})
export class InvoicePersistenceModule {}
