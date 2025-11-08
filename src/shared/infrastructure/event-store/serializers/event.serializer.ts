import { Injectable } from '@nestjs/common';
import { VersionedAggregateRoot } from '../../../domain/aggregate-root';
import { EventEntity } from '../entities/event.entity';

@Injectable()
export class EventSerializer {
  serialize<T extends object>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ): EventEntity {
    const eventType = event.constructor?.name;

    if (!eventType) {
      throw new Error('Incompatible event type');
    }

    return {
      streamId: dispatcher.id,
      position: dispatcher.version.value + 1,
      type: eventType,
      data: event,
    };
  }
}
