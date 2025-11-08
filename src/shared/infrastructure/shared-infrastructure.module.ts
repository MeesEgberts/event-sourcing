import { Module } from '@nestjs/common';
import { EVENT_STORE_CONNECTION } from '../../core/core.constants';
import { EventSerializer } from './event-store/serializers/event.serializer';
import { EventStorePublisher } from './event-store/publishers/event-store.publisher';
import { EventStore } from '../application/ports/event-store';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './event-store/entities/event.entity';
import { EventEntitySubscriber } from './event-store/event-subscriber';
import { PgEventStore } from './event-store/event-store';
import { EventDeserializer } from './event-store/deserializers/event.deserializer';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity], EVENT_STORE_CONNECTION)],
  providers: [
    EventSerializer,
    EventDeserializer,
    EventStorePublisher,
    PgEventStore,
    EventEntitySubscriber,
    {
      provide: EventStore,
      useExisting: PgEventStore,
    },
  ],
  exports: [EventStore],
})
export class SharedInfrastructureModule {}
