import { Injectable, Type } from '@nestjs/common';
import { EventEntity } from '../entities/event.entity';
import { EventClsRegistry } from '../event-cls.registry';

@Injectable()
export class EventDeserializer {
  deserialize(e: EventEntity): EventEntity {
    const cls: Type = EventClsRegistry.get(e.type);

    return {
      ...e,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      data: Object.assign(Object.create(cls.prototype), e.data),
    };
  }
}
