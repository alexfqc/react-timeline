import type { TimelineItem, PositionedItem } from "../types";

// Helper to calculate how many days between two dates
export function getDateDiff(startDate: string, endDate: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;

  return Math.floor(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / msPerDay,
  );
}

export function calculateLanes(events: TimelineItem[]): PositionedItem[] {
  const lanes: PositionedItem[][] = [];

  const sorted = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );

  for (const event of sorted) {
    const laneIndex = lanes.findIndex((lane) => {
      const last = lane[lane.length - 1];
      return new Date(event.start) > new Date(last.end);
    });

    if (laneIndex !== -1) {
      lanes[laneIndex].push({ ...event, lane: laneIndex });
    } else {
      lanes.push([{ ...event, lane: lanes.length }]);
    }
  }

  return lanes.flat();
}
