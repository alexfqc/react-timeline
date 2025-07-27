import { getDateDiff, calculateLanes } from "./utils";
import TimelineEvent from "./TimelineEvent";
import timelineItems from "../timelineItems.ts";

function TimelineContent() {
  // this returns a flat array of events with assigned lanes,
  // along with the earliest start date and latest end date
  const { events, startDate, endDate } = calculateLanes(timelineItems);

  // calculate how many columns (days) and rows (lanes) the grid should have
  const totalDays = getDateDiff(startDate, endDate) + 1;
  const totalLanes = Math.max(...events.map((e) => e.lane)) + 1;

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-2 rounded bg-gray-100 p-4"
        style={{
          // each lane takes 40px in height
          gridTemplateRows: `repeat(${totalLanes}, 40px)`,
          // each day gets one column
          gridTemplateColumns: `repeat(${totalDays}, 1fr)`,
        }}
      >
        {events.map((item) => (
          <TimelineEvent
            key={item.id}
            timelineEvent={item}
            startDate={startDate}
          />
        ))}
      </div>
    </div>
  );
}

export default TimelineContent;
