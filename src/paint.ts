import { getValue } from "./shared/utils";
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
  { inputProperties, inputArguments, contextOptions }: RegisterPaintArguments
) => {
  class PaintClass implements PaintClassInterface {
    static get inputProperties() {
      return getValue(inputProperties, []);
    }
    static get inputArguments() {
      return getValue(inputArguments, []);
    }
    static get contextOptions() {
      return getValue(contextOptions, { alpha: true });
    }
    paint(ctx: any, size: any, styleMap: any) {
      paintFunction(ctx, size, styleMap);
    }
  }
  // @ts-ignore
  (registerPaint as RegisterPaint)(name, PaintClass);
};
