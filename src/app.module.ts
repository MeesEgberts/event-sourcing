import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InvoicesModule } from './invoices/application/invoices.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [CqrsModule.forRoot(), InvoicesModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
