import {
  DOMString,
  PaintClassInterface,
  PaintFunction,
  RegisterPaint,
  RegisterPaintArguments
} from "./types";

export const createPaint = (
  name: DOMString,
  paintFunction: PaintFunction,
  {
    inputProperties = [],
    inputArguments = [],
    contextOptions = { alpha: true }
  }: RegisterPaintArguments = {}
) => {
  class PaintClass implements PaintClassInterface {
    static get inputProperties() {
      return inputProperties;
    }
    static get inputArguments() {
      return inputArguments;
    }
    static get contextOptions() {
      return contextOptions;
    }
    paint(ctx: any, size: any, styleMap: any) {
      paintFunction(ctx, size, styleMap);
    }
  }
  // @ts-expect-error registerPaint not found
  (registerPaint as RegisterPaint)(name, PaintClass);
};
