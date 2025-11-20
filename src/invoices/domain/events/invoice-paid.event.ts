import { AutoWiredEvent } from '../../../shared/decorators/autowired-event.decorator';

@AutoWiredEvent
export class InvoicePaidEvent {
  constructor(public readonly id: string) {}
}
