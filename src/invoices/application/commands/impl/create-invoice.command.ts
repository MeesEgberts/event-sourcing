export class CreateInvoiceCommand {
  constructor(
    public readonly customerId: string,
    public readonly amount: number,
  ) {}
}
