import { useMachine } from "@xstate/react";

import { clock } from "~/machines";

export default function App() {
  const [state, send] = useMachine(clock, {
    actions: {
      rotateSecondHand: (ctx, evt) => console.log(ctx.secondHandDegree, evt),
      rotateMinuteHand: (ctx, evt) => console.log(ctx.minuteHandDegree, evt),
      rotateHourHand: (ctx, evt) => console.log(ctx.hourHandDegree, evt),
    },
  });

  return (
    <div>
      <button onClick={() => send({ type: "TURN_OFF" })}>TURN_OFF</button>
      <button onClick={() => send("TURN_ON")}>TURN_ON</button>
      <pre style={{ display: "block" }}>{state.can("TURN_OFF").toString()}</pre>
    </div>
  );
}
