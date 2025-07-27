import timelineItems from "./timelineItems.ts";
import Timelines from "./Timelines/index.tsx";

function App() {
  return (
    <div>
      <h2>Start editing to see some magic happen {"\u2728"}</h2>
      <Timelines timelineItems={timelineItems} />
    </div>
  );
}

export default App;
