import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus, IEvent, IEventPublisher } from '@nestjs/cqrs';
import { EventSerializer } from '../serializers/event.serializer';
import { VersionedAggregateRoot } from '../../../domain/aggregate-root';
import { PgEventStore } from '../event-store';

@Injectable()
export class EventStorePublisher
  implements OnApplicationBootstrap, IEventPublisher
{
  private readonly logger = new Logger(EventStorePublisher.name);

  constructor(
    private readonly eventStore: PgEventStore,
    private readonly eventBus: EventBus,
    private readonly eventSerializer: EventSerializer,
  ) {}

  onApplicationBootstrap() {
    this.eventBus.publisher = this;
  }

  publish<T extends IEvent = IEvent>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ) {
    this.logger.debug(`Publishing event: ${JSON.stringify(event)}`);

    const serializableEvent = this.eventSerializer.serialize(event, dispatcher);
    return this.eventStore.persist(serializableEvent);
  }

  publishAll<T extends IEvent>(
    events: T[],
    dispatcher: VersionedAggregateRoot,
  ) {
    this.logger.debug(`Publishing events: ${JSON.stringify(events)}`);

    const serializableEvents = events
      .map((event) => this.eventSerializer.serialize(event, dispatcher))
      .map((serializableEvent, index) => ({
        ...serializableEvent,
        position: dispatcher.version.value + index + 1,
      }));

    return this.eventStore.persist(serializableEvents);
  }
}
