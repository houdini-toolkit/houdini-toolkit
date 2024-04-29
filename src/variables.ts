"use strict";
/**
 *  Checks if the Paint API is supported
 */
export const isPaintSupported = "paintWorklet" in CSS;
