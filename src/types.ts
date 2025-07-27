export type TimelineItem = {
  id: number;
  name: string;
  start: string;
  end: string;
};

export type PositionedItem = TimelineItem & { lane: number };
