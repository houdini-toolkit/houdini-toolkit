"use strict";
export type DOMString = string;

export type PaintFunction = (ctx: any, geom: any, properties: any) => void;

export type inputPropertiesType = string[];

export type inputArgumentsType = string[];

export type contextOptionsType = {
  alpha: boolean;
};

export type RegisterPaintArguments = {
  inputProperties?: inputPropertiesType;
  inputArguments?: inputArgumentsType;
  contextOptions?: contextOptionsType;
};

export declare class PaintClassInterface {
  static get inputProperties(): inputPropertiesType;
  static get inputArguments(): inputArgumentsType;
  static get contextOptions(): contextOptionsType;
  paint(ctx: any, geom: any, properties: any): void;
}

export type RegisterPaint = (
  name: DOMString,
  voidFunction: PaintClassInterface
) => undefined;
