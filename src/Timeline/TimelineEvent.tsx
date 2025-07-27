import { memo } from "react";
import { getDateDiff } from "./utils";
import { type PositionedEvent } from "../types";
import { COLORS } from "./constants";

type Props = {
  timelineEvent: PositionedEvent;
  startDate: string;
};

function TimelineEvent({ timelineEvent, startDate }: Props) {
  // calculate the starting column of the event based on its start date
  const colStart = getDateDiff(startDate, timelineEvent.start) + 1;
  // calculate how many columns (days) the event spans
  const colSpan = getDateDiff(timelineEvent.start, timelineEvent.end) + 1;

  return (
    <div
      className="overflow-hidden text-ellipsis whitespace-nowrap rounded px-2 py-1 text-sm text-white shadow transition-all duration-300 hover:brightness-110"
      style={{
        // assign a color based on the lane index
        backgroundColor: COLORS[timelineEvent.lane % 4],
        // position the event in the correct column and row
        gridColumnStart: colStart,
        gridColumnEnd: `span ${colSpan}`,
        gridRowStart: timelineEvent.lane + 1,
      }}
      // tooltip on hover with full name and date range
      title={`${timelineEvent.name} (${timelineEvent.start} - ${timelineEvent.end})`}
    >
      {timelineEvent.name}
    </div>
  );
}

export default memo(TimelineEvent);
