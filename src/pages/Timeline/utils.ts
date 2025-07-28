import type { TimelineEvent, PositionedEvent } from "./types";

// helper to calculate how many days between two dates
export function getDateDiff(startDate: string, endDate: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;

  return Math.floor(
    (new Date(endDate).getTime() - new Date(startDate).getTime()) / msPerDay,
  );
}

// function to calculate lanes for timeline items
export function calculateLanes(events: TimelineEvent[]): {
  events: PositionedEvent[];
  startDate: string;
  endDate: string;
} {
  // create an array of lanes (each lane is a list of non-overlapping events)
  const lanes: PositionedEvent[][] = [];

  // sort events chronologically by start date
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );

  // iterate through each event and assign it to the first available lane
  for (const event of sortedEvents) {
    // find the first lane where the event doesn't overlap with the last item
    const laneIndex = lanes.findIndex((lane) => {
      const last = lane[lane.length - 1];
      return new Date(event.start) > new Date(last.end);
    });

    if (laneIndex !== -1) {
      // place the event in the found lane if it exists
      lanes[laneIndex].push({ ...event, lane: laneIndex });
    } else {
      // if no available lane, create a new one
      lanes.push([{ ...event, lane: lanes.length }]);
    }
  }

  // flatten all lanes into a single array
  const flatLanes = lanes.flat();

  // sse the first sorted event as the start of the timeline
  const startDate = sortedEvents[0].start;

  // get the latest end date among all events
  const endDate = sortedEvents.reduce((latest, current) =>
    new Date(current.end) > new Date(latest.end) ? current : latest,
  ).end;

  return {
    events: flatLanes,
    startDate,
    endDate,
  };
}

// formats a date string into a more human-readable format like "Dec 5, 2021"
export function formatDate(dateString: string) {
  // Parse the input string into a Date object
  // set to UTC to avoid timezone issues
  const date = new Date(dateString + "T00:00:00Z");

  // format the date using the US locale with abbreviated month and numeric day/year
  return date.toLocaleDateString("en-US", {
    year: "numeric", // e.g., "2021"
    month: "short", // e.g., "Dec"
    day: "numeric", // e.g., "5"
    timeZone: "UTC", // set to UTC to avoid timezone issues
  });
}
