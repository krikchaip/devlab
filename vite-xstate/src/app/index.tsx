import { useMachine } from "@xstate/react";

import { clock } from "~/machines";

export default function App() {
  const [state, send] = useMachine(clock);
  return (
    <div className="absolute-center space-y-5">
      <div
        className="
          w-[25rem] h-[25rem] rounded-full border-8 relative
          before:w-1.5 before:h-1.5 before:absolute-center before:bg-black before:rounded-full
        "
      >
        {Array.from(Array(12), (_, i) => (
          <div
            key={i}
            className="
              w-0.5 h-[calc(12.5rem-8px)] bg-black absolute-center !top-0 origin-bottom
              [clip-path:inset(0_0_calc(100%-theme(spacing.2)))]
            "
            style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }}
          />
        ))}
      </div>
      <div className="space-x-2 flex justify-center">
        <button
          className="p-2 rounded border border-solid border-red-500 hover:bg-red-200 transition"
          onClick={() => send("TURN_OFF")}
        >
          TURN_OFF
        </button>
        <button
          className="p-2 rounded border border-solid border-red-500 hover:bg-red-200 transition"
          onClick={() => send("TURN_ON")}
        >
          TURN_ON
        </button>
      </div>
    </div>
  );
}
