import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { InvoicesModule } from './invoices/application/invoices.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CqrsModule.forRoot(), CoreModule, SharedModule, InvoicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
