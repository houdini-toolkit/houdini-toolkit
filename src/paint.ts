"use strict";
import {
  DOMString,
  PaintClassInterface,
  PaintFunction,
  PaintGeometry,
  RegisterPaint,
  PaintOptions
} from "./types";

/**
 *  The createPaint() function registers a class to programmatically generate an image where a CSS property expects a file.
 */
export const createPaint = (
  name: DOMString,
  paintFunction: PaintFunction,
  {
    inputProperties = [],
    inputArguments = [],
    contextOptions = { alpha: true }
  }: PaintOptions = {}
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
    paint(
      ctx: CanvasRenderingContext2D,
      geom: PaintGeometry,
      properties: StylePropertyMapReadOnly
    ) {
      paintFunction(ctx, geom, properties);
    }
  }
  // @ts-expect-error registerPaint not found
  (registerPaint as RegisterPaint)(name, PaintClass);
};

export const isPaintSupported = "paintWorklet" in CSS;
