export class CreateInvoiceDto {
  readonly customerId: string;
  readonly amount: number;
  readonly paid: boolean;
}
