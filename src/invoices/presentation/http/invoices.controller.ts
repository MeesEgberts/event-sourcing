import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InvoicesService } from '../../application/invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { InvoiceReadModel } from '../../domain/read-models/invoice.read-model';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @ApiOperation({ operationId: 'create_invoice' })
  @ApiCreatedResponse({ type: InvoiceReadModel })
  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @ApiOperation({ operationId: 'find_all_invoice' })
  @ApiOkResponse({ type: [InvoiceReadModel] })
  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }

  @ApiOperation({ operationId: 'find_by_id_invoice' })
  @ApiOkResponse({ type: InvoiceReadModel })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @ApiOperation({ operationId: 'pay_invoice' })
  @ApiOkResponse({ type: InvoiceReadModel })
  @Patch(':id/pay')
  pay(@Param('id') id: string) {
    return this.invoicesService.pay(id);
  }
}
