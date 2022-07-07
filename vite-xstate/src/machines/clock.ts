import { createMachine, assign } from "xstate";

export type ClockContext = typeof clockContext;
export const clockContext = {
  secondHandDegree: 0,
  minuteHandDegree: 0,
  hourHandDegree: 0,
};

export default /** @xstate-layout N4IgpgJg5mDOIC5QGMA2B7ZBrAdOgZvgMQAqAqgEoByA+gPJWKgAO6sAlgC7voB2TIAB6IAjADYArDgCcs2RJEAOACyrpYgMwAaEAE9EAJmXScx2YrEjpigOwGADCJsBfZzrSZcfHOwiowRIKwnACGnGA4IfjhAE4AFCL2SQCURB7YeLw+fmACrBzcfALCCGo4BuoWGspOdprKOvoIFQY44mKSGjb2ymLGru4YGd7c2ER5bFw8-EhCiMY2ODaKIgZiioqOErJijYaqbR19iganihISXQMg6V68pJS0dABizxMF08WikjJy0goqNSaPbNRymP6JDROAwrESuNwgXjoCBwAS3PCEd5TIqzErKAwghytRQaUkGERQsQGLrU67o7y+fxYwozUAlDQGKQVdYKGEw0m7PT7KRmawaDrKGySAwuBH0rKjLDMz64xBiMGJaTi7bSBw2Qn2MS-cz1DT-HqywaeTLKnFsxAaMHc86rE4k8UgikaY2yPkiEQSFRiOlDJWzfLY1lzBBKQnev4Jv4WeHOIA */
createMachine<ClockContext>({
  id: "clock",
  description: "clock signals simulation",
  context: clockContext,
  initial: "off",
  states: {
    off: {
      on: {
        TURN_ON: {
          target: "on",
        },
      },
    },
    on: {
      initial: "idle",
      states: {
        idle: {
          after: {
            "1000": {
              target: "tick",
            },
          },
        },
        tick: {
          entry: ["rotateSecondHand", "rotateMinuteHand", "rotateHourHand"],
          always: {
            target: "idle",
          },
        },
      },
      on: {
        TURN_OFF: {
          target: "off",
        },
      },
    },
  },
});
