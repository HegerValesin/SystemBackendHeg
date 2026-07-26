export interface EventEnvelope<TPayload> {
  eventId: string;
  eventType: string;
  version: 1;
  source: string;
  occurredAt: string;
  payload: TPayload;
}

export interface OperationEventPayload {
  operationId: string;
  operationNumber: string;
  occurrenceId: string;
  status: string;
}
