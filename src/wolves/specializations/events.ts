import { EventType, EVENT } from "./types";

export function orderedEvents(events: EVENT[]): EVENT[] {
  return events.sort((a: EVENT, b: EVENT): number => {
    // equal items sort equally
    if (a.order === b.order) return 0;
    // nulls sort before anything else
    else if (!a.order) return -1;
    else if (!b.order) return 1;
    return a.order < b.order ? -1 : 1;
  });
}

export function applyInstantEvent(event: EVENT): void {
  switch (event.type) {
    case EventType.ACTIVE: {
    }
    case EventType.PASSIVE: {
    }
    case EventType.ACTIVE_REPLACE: {
    }
    case EventType.UNIT_MODIFIER: {
    }
  }
}

export function applyInstantEvents(events: EVENT[], player: player): void {
  events.forEach(applyInstantEvent);
}
