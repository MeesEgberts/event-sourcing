import { EventEntity } from '../../infrastructure/event-store/entities/event.entity';

export abstract class EventStore {
  abstract persist(eventOrEvents: EventEntity | EventEntity[]): Promise<void>;
  abstract getEventsByStreamId(streamId: string): Promise<EventEntity[]>;
}
