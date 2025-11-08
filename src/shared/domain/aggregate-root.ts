import { AggregateRoot } from '@nestjs/cqrs';
import { Version } from './value-objects/version';
import { EventEntity } from '../infrastructure/event-store/entities/event.entity';

const VERSION = Symbol('version');

export class VersionedAggregateRoot extends AggregateRoot {
  public id: string;

  private [VERSION] = new Version(0);

  get version(): Version {
    return this[VERSION];
  }

  set version(version: Version) {
    this[VERSION] = version;
  }

  loadFromHistory(history: EventEntity[]) {
    const domainEvents = history.map((event) => event.data);
    super.loadFromHistory(domainEvents);

    const lastEvent = history[history.length - 1];
    this.version = new Version(lastEvent.position);
  }
}
