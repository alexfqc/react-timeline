import { type TimelineItem } from "../types";
import { getDateDiff } from "./utils";

const timelineStart = "2021-01-01";

function Timelines({ timelineItems }: { timelineItems: TimelineItem[] }) {
  return (
    <div
      className="grid gap-2 overflow-x-auto bg-gray-100 p-4"
      style={{
        gridTemplateRows: "repeat(2, 40px)",
        gridTemplateColumns: "repeat(20, 1fr)",
      }}
    >
      {timelineItems.map((item, index) => {
        const colStart = getDateDiff(timelineStart, item.start) + 1;
        const colSpan = getDateDiff(item.start, item.end) + 1;
        const rowStart = index === 1 ? 2 : 1;

        return (
          <div
            key={item.id}
            className="col-span-1 col-start-1 row-start-1 rounded px-2 py-1 text-sm text-white shadow"
            style={{
              backgroundColor: ["#3b82f6", "#10b981", "#a855f7"][index % 3],
              gridColumnStart: colStart,
              gridColumnEnd: `span ${colSpan}`,
              gridRowStart: rowStart,
            }}
            title={`${item.start} → ${item.end}`}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
}

export default Timelines;
