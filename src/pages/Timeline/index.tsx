import TimelineContent from "./TimelineContent";

function Timeline() {
  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full max-w-6xl">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Events Timeline
        </h2>
        {/* case TimelineContent fetches data from the server, Suspense could be used here */}
        <TimelineContent />
      </div>
    </div>
  );
}

export default Timeline;
