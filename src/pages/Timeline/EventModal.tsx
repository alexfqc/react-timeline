import { type PositionedEvent } from "./types";
import { formatDate } from "./utils";

type Props = {
  event: PositionedEvent;
  onClose: () => void;
};

function EventModal({ event, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex cursor-pointer items-start justify-center bg-black/40 pt-20 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm cursor-default rounded-xl bg-white px-6 py-5 text-gray-800 shadow-none ring-1 ring-gray-200"
        onClick={(e) => {
          // Prevent closing when clicking inside the modal
          e.stopPropagation();
        }}
      >
        <header className="mb-4">
          <h2
            id="event-modal-title"
            className="text-xl font-semibold leading-tight"
          >
            {event.name}
          </h2>
        </header>

        <div className="space-y-1.5 text-sm">
          <p>
            <span className="font-medium text-gray-600">Start date:</span>{" "}
            {formatDate(event.start)}
          </p>
          <p>
            <span className="font-medium text-gray-600">End date:</span>{" "}
            {formatDate(event.end)}
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-green-100 px-4 py-2 text-sm font-medium text-green-800 transition hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventModal;
