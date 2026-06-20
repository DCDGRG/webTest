import '@testing-library/jest-dom'

// jsdom has no WebGL/canvas backend. Components that probe for a context
// (e.g. ShaderBackground) should get null silently instead of jsdom's noisy
// "Not implemented: HTMLCanvasElement.getContext" logs.
HTMLCanvasElement.prototype.getContext =
  (() => null) as unknown as typeof HTMLCanvasElement.prototype.getContext
