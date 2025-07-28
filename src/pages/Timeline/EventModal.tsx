import { useState, type ChangeEvent, memo } from "react";
import { type PositionedEvent } from "./types";
import { formatDate } from "./utils";

type Props = {
  event: PositionedEvent;
  onClose: () => void;
  onUpdate: ({
    updatedEvent,
    shouldCalculateLanes,
  }: {
    updatedEvent: PositionedEvent;
    shouldCalculateLanes: boolean;
  }) => void;
};

function EventModal({ event, onClose, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<PositionedEvent>(event);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const endDate = new Date(editedEvent.end);
    const startDate = new Date(e.target.value);

    setEditedEvent({
      ...editedEvent,
      start: startDate < endDate ? e.target.value : editedEvent.end,
    });
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const startDate = new Date(editedEvent.start);
    const endDate = new Date(e.target.value);

    setEditedEvent({
      ...editedEvent,
      end: endDate > startDate ? e.target.value : editedEvent.start,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    onUpdate({
      updatedEvent: { ...editedEvent, name: editedEvent.name.trim() },
      shouldCalculateLanes:
        event.start !== editedEvent.start || event.end !== editedEvent.end,
    });
  };

  const isSaveButtonDisabled =
    editedEvent.name.trim() === "" ||
    editedEvent.start === "" ||
    editedEvent.end === "" ||
    new Date(editedEvent.start) > new Date(editedEvent.end);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-24 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <h2 id="modal-title" className="text-lg font-semibold text-gray-800">
            Event Details
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Edit event"
              onClick={() => setIsEditing((prev) => !prev)}
              className={`rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 ${
                isEditing
                  ? "transition hover:bg-red-200 hover:text-red-700"
                  : "transition hover:bg-blue-200 hover:text-blue-700"
              }`}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <button
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              className="rounded-md bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 transition hover:bg-red-100 hover:text-red-700"
            >
              Close
            </button>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Name
            </label>
            {isEditing ? (
              <input
                aria-label="Edit event name"
                id="name"
                name="name"
                type="text"
                className="w-full rounded border px-2 py-1 text-sm"
                value={editedEvent.name}
                onChange={handleNameChange}
              />
            ) : (
              <p>{event.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="start" className="mb-1 block font-medium">
              Start Date
            </label>
            {isEditing ? (
              <input
                aria-label="Edit start date"
                id="start"
                name="start"
                type="date"
                className="w-full rounded border px-2 py-1 text-sm"
                value={editedEvent.start}
                onChange={handleStartDateChange}
              />
            ) : (
              <p>{formatDate(event.start)}</p>
            )}
          </div>

          <div>
            <label htmlFor="end" className="mb-1 block font-medium">
              End Date
            </label>
            {isEditing ? (
              <input
                aria-label="Edit end date"
                id="end"
                name="end"
                type="date"
                className="w-full rounded border px-2 py-1 text-sm"
                value={editedEvent.end}
                onChange={handleEndDateChange}
              />
            ) : (
              <p>{formatDate(event.end)}</p>
            )}
          </div>

          {isEditing && (
            <button
              type="button"
              aria-label="Save changes"
              onClick={handleSave}
              className={`mt-4 w-full rounded px-4 py-2 text-sm font-medium transition ${
                isSaveButtonDisabled
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-gray-200 text-gray-700 hover:bg-green-200 hover:text-green-700"
              }`}
              disabled={isSaveButtonDisabled}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(EventModal);
