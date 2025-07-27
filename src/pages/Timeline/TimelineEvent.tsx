import { memo } from "react";
import { getDateDiff } from "./utils";
import { type PositionedEvent } from "./types";
import { COLORS } from "./constants";

type Props = {
  timelineEvent: PositionedEvent;
  startDate: string;
  onClick: () => void;
};

function TimelineEvent({ timelineEvent, startDate, onClick }: Props) {
  // calculate the starting column of the event based on its start date
  const colStart = getDateDiff(startDate, timelineEvent.start) + 1;
  // calculate how many columns (days) the event spans
  const colSpan = getDateDiff(timelineEvent.start, timelineEvent.end) + 1;

  return (
    <button
      type="button"
      onClick={onClick}
      className="overflow-hidden text-ellipsis whitespace-nowrap rounded px-2 py-1 text-sm text-white shadow transition-all duration-300 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: COLORS[timelineEvent.lane % 4],
        gridColumnStart: colStart,
        gridColumnEnd: `span ${colSpan}`,
        gridRowStart: timelineEvent.lane + 1,
      }}
      aria-label={`View details for ${timelineEvent.name}`}
      title={`${timelineEvent.name} (${timelineEvent.start} - ${timelineEvent.end})`}
    >
      {timelineEvent.name}
    </button>
  );
}

export default memo(TimelineEvent);
