import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { EventBus } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { EventStore } from '../../application/ports/event-store';
import { InjectDataSource } from '@nestjs/typeorm';
import { EVENT_STORE_CONNECTION } from '../../../core/core.constants';

@EventSubscriber()
export class EventEntitySubscriber
  implements EntitySubscriberInterface<EventEntity>
{
  private readonly logger = new Logger(EventStore.name);

  constructor(
    @InjectDataSource(EVENT_STORE_CONNECTION)
    private readonly dataSource: DataSource,
    private readonly eventBus: EventBus,
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return EventEntity;
  }

  afterInsert(event: InsertEvent<EventEntity>) {
    this.eventBus.subject$.next(event.entity.data);
  }
}
