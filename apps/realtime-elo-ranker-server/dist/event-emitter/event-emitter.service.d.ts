import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class EventEmitterService {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    getEventEmitter(): EventEmitter2;
    emit(event: string, payload: any): void;
}
