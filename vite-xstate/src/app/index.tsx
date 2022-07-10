import { useMachine } from "@xstate/react";

import { clock } from "~/machines";

export default function App() {
  const [state, send] = useMachine(clock);
  return (
    <div>
      <button onClick={() => send("TURN_OFF")}>TURN_OFF</button>
      <button onClick={() => send("TURN_ON")}>TURN_ON</button>
      <pre style={{ display: "block" }}>{state.can("TURN_OFF").toString()}</pre>
    </div>
  );
}
