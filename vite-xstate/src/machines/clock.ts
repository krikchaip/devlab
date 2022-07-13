import { createMachine, assign } from "xstate";

export type ClockContext = typeof clockContext;
export const clockContext = {
  secondHandDegree: 0,
  minuteHandDegree: 0,
  hourHandDegree: 0,
};

export type ClockEvent = { type: "TURN_ON" } | { type: "TURN_OFF" };

export default /** @xstate-layout N4IgpgJg5mDOIC5QGMA2B7ZBrAdOgZvgMQAqAqgEoByA+gPJWKgAO6sAlgC7voB2TIAB6IAjAGYxOMSIAMMgGwAOAJwB2aQCYALPIA0IAJ6JtWnCPkWtijTcUBWO1oC+T-Wky4+OdhFRgigrCcAIacYDjB+GEATgAUsnIAlETu2Hi83r5gAqwc3HwCwghaDjgyGoqqIlpaqvJ2qlb6RggaYqo48jLKWspdyspiiooiqi5uGGle3NhEOWxcPPxIQoi1yjgaqjL2IxYKYsrNoqobciKK8jV28soNyuMgqZ68pJS0dABin-N5S4WiDQbPryCQ6AZqHR2Y4IUZnGQXK4lW73FyuEC8dAQOACZ54Qi-RYFFZFAC0QJwVWUsnkpwOWi2MI0ozMVTsbQa5Su4keeK8Pj8hPyy1ARQkIjKFW2bS05msMmhhmMOzM3TsKi2ym6lV5kxeOBmWCF-xJiHkGjsmwczIalV6Whh1XknW6V0UNQ0CO6Gl1HnSxuJosQYhkHXKlXKYllSk9ipa6hdIJEAxuybEPvRzwDItWCFJdkkVJpdNBDNUMNJYmdhxkUfko2jahEaKcQA */
createMachine(
  {
    context: clockContext,
    tsTypes: {} as import("./clock.typegen").Typegen0,
    schema: { context: {} as ClockContext, events: {} as ClockEvent },
    id: "clock",
    description: "clock signals simulation",
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
  },
  {
    actions: {
      rotateSecondHand: assign({
        secondHandDegree: ctx => (ctx.secondHandDegree + 6) % 360,
      }),
      rotateMinuteHand: assign({
        minuteHandDegree: ctx => (ctx.minuteHandDegree + 1 / 10) % 360,
      }),
      rotateHourHand: assign({
        hourHandDegree: ctx => (ctx.hourHandDegree + 1 / 120) % 360,
      }),
    },
  }
);
