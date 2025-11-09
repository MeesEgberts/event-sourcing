import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';
import { UpsertInvoiceRepository } from '../../application/ports/upsert-invoice.repository';
import { OrmUpsertInvoiceRepository } from './repositories/upsert-invoice.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity])],
  providers: [
    {
      provide: UpsertInvoiceRepository,
      useClass: OrmUpsertInvoiceRepository,
    },
  ],
  exports: [UpsertInvoiceRepository],
})
export class InvoicePersistenceModule {}
