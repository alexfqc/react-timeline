import { useMemo } from "react";
import { getDateDiff, calculateLanes } from "./utils";
import type { TimelineEvent } from "../types";

type Props = {
  timelineItems: TimelineEvent[];
};

function Timeline({ timelineItems }: Props) {
  // memoize the lane calculation to avoid recalculating on every render
  // this returns a flat array of events with assigned lanes,
  // along with the earliest start date and latest end date
  const { events, startDate, endDate } = useMemo(
    () => calculateLanes(timelineItems),
    [timelineItems],
  );

  // calculate how many columns (days) and rows (lanes) the grid should have
  const totalDays = getDateDiff(startDate, endDate) + 1;
  const totalLanes = Math.max(...events.map((e) => e.lane)) + 1;

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-2 bg-gray-100 p-4"
        style={{
          // each lane takes 40px in height
          gridTemplateRows: `repeat(${totalLanes}, 40px)`,
          // each day gets one column
          gridTemplateColumns: `repeat(${totalDays}, 1fr)`,
        }}
      >
        {events.map((item) => {
          // calculate the starting column of the event based on its start date
          const colStart = getDateDiff(startDate, item.start) + 1;
          // calculate how many columns (days) the event spans
          const colSpan = getDateDiff(item.start, item.end) + 1;

          return (
            <div
              key={item.id}
              className="overflow-hidden text-ellipsis whitespace-nowrap rounded px-2 py-1 text-sm text-white shadow"
              style={{
                // assign a color based on the lane index
                backgroundColor: ["#3b82f6", "#10b981", "#a855f7", "#f97316"][
                  item.lane % 4
                ],
                // position the event in the correct column and row
                gridColumnStart: colStart,
                gridColumnEnd: `span ${colSpan}`,
                gridRowStart: item.lane + 1,
              }}
              // tooltip on hover with full name and date range
              title={`${item.name} (${item.start} - ${item.end})`}
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Timeline;
