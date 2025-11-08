import { Injectable, Logger } from '@nestjs/common';
import { EventStore } from '../../application/ports/event-store';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { DataSource, Repository } from 'typeorm';
import { EVENT_STORE_CONNECTION } from '../../../core/core.constants';
import { EventDeserializer } from './deserializers/event.deserializer';

@Injectable()
export class PgEventStore implements EventStore {
  private readonly logger = new Logger(EventStore.name);

  constructor(
    @InjectRepository(EventEntity, EVENT_STORE_CONNECTION)
    private eventStore: Repository<EventEntity>,
    @InjectDataSource(EVENT_STORE_CONNECTION)
    private dataSource: DataSource,
    private readonly eventDeserializer: EventDeserializer,
  ) {}

  async persist(eventOrEvents: EventEntity | EventEntity[]) {
    const events = Array.isArray(eventOrEvents)
      ? eventOrEvents
      : [eventOrEvents];

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(EventEntity, events);

      await queryRunner.commitTransaction();
      this.logger.debug(`Events inserted successfully to the event store`);
    } catch (error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async getEventsByStreamId(streamId: string) {
    const events = await this.eventStore.find({
      where: { streamId },
      order: { position: 'ASC' },
    });

    if (events.length === 0) {
      throw new Error(`Aggregate with id ${streamId} does not exist`);
    }

    return events.map((e) => this.eventDeserializer.deserialize(e));
  }
}
