import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InvoicesModule } from './invoices/application/invoices.module';

@Module({
  imports: [CqrsModule.forRoot(), InvoicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
