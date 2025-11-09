import { Module } from '@nestjs/common';
import { InvoicePersistenceModule } from './persistance/persistence.module';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule, InvoicePersistenceModule],
  exports: [SharedModule, InvoicePersistenceModule],
})
export class InvoiceInfrastructureModule {}
