import { AutoWiredEvent } from '../../../shared/decorators/autowired-event.decorator';

@AutoWiredEvent
export class InvoiceCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly amount: number,
  ) {}
}
