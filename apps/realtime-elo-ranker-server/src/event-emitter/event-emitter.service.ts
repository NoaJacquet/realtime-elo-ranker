import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EventEmitterService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  getEventEmitter(): EventEmitter2{
    return this.eventEmitter;
  }
  emit(event: string, payload: any) {
    this.eventEmitter.emit(event, payload);
  }
}
