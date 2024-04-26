import { getValue } from "./shared/utils";
import {
  PaintClassInterface,
  RegisterPaint,
  RegisterPaintArguments
} from "./types";

export const createPaint = ({
  name,
  paintFunction,
  inputProperties,
  inputArguments,
  contextOptions
}: RegisterPaintArguments) => {
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
