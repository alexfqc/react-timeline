export type TimelineEvent = {
  id: number;
  name: string;
  start: string;
  end: string;
};

export type PositionedEvent = TimelineEvent & { lane: number };
