"use strict";
export type DOMString = string;

export interface PaintGeometry {
  width: number;
  height: number;
}

export type PaintFunction = (
  ctx: CanvasRenderingContext2D,
  geom: PaintGeometry,
  properties: StylePropertyMapReadOnly
) => void;

export type InputProperties = string[];

export type InputArguments = string[];

export interface ContextOptions {
  alpha: boolean;
}

export type PaintOptions = {
  inputProperties?: InputProperties;
  inputArguments?: InputArguments;
  contextOptions?: ContextOptions;
};

export declare class PaintClassInterface {
  static get inputProperties(): InputProperties;
  static get inputArguments(): InputArguments;
  static get contextOptions(): ContextOptions;
  paint(
    ctx: CanvasRenderingContext2D,
    geom: PaintGeometry,
    properties: StylePropertyMapReadOnly
  ): void;
}

export type RegisterPaint = (
  name: DOMString,
  voidFunction: PaintClassInterface
) => undefined;
