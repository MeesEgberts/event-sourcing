import { ApiProperty } from '@nestjs/swagger';

export class InvoiceReadModel {
  @ApiProperty({ example: 'cus_123456789' })
  readonly customerId: string;

  @ApiProperty({ example: 1000, description: "Invoice's amount in cents" })
  readonly amount: number;
}
