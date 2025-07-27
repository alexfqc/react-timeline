import { useState } from "react";
import { type PositionedEvent } from "./types.ts";
import { getDateDiff, calculateLanes } from "./utils.ts";
import TimelineEvent from "./TimelineEvent.tsx";
import EventModal from "./EventModal.tsx";
import timelineItems from "../../timelineItems.ts";

function TimelineContent() {
  // state to manage the currently selected event for the modal
  // initially set to null, meaning no event is selected
  const [selectedEvent, setSelectedEvent] = useState<PositionedEvent | null>(
    null,
  );

  // this returns a flat array of events with assigned lanes,
  // along with the earliest start date and latest end date
  const { events, startDate, endDate } = calculateLanes(timelineItems);

  // calculate how many columns (days) and rows (lanes) the grid should have
  const totalDays = getDateDiff(startDate, endDate) + 1;
  const totalLanes = Math.max(...events.map((e) => e.lane)) + 1;

  return (
    <>
      <div className="w-full overflow-x-auto rounded bg-gray-100">
        <div
          className="grid gap-2 p-4"
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
              onClick={() => setSelectedEvent(item)}
            />
          ))}
        </div>
      </div>
      {selectedEvent ? (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      ) : null}
    </>
  );
}

export default TimelineContent;
