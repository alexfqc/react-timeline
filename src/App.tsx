import timelineItems from "./timelineItems.ts";
import Timeline from "./Timeline/index.tsx";

function App() {
  return (
    <div>
      <h2>Start editing to see some magic happen {"\u2728"}</h2>
      <Timeline timelineItems={timelineItems} />
    </div>
  );
}

export default App;
