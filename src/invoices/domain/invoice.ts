import { VersionedAggregateRoot } from '../../shared/domain/aggregate-root';

export class Invoice extends VersionedAggregateRoot {
  public customerId: string;
  public amount: number;

  constructor(public id: string) {
    super();
  }
}
