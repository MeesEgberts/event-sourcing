import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from '../presentation/http/dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  create(dto: CreateInvoiceDto) {
    throw new Error('Method not implemented.');
  }
}
