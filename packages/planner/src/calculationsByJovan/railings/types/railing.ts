// types/railings.ts

import { RailingParameters } from '../railingParameters';

/**
 * An optional abstract base class for Railing.
 * This is similar to BaseCeiling if you want common logic for all railing types.
 */
export abstract class Railing<T = any> {
  protected params: RailingParameters;
  protected components: T[] = [];

  constructor(params: RailingParameters) {
    this.params = params;
    this.initialize();
  }

  protected abstract initialize(): void;

  public getComponents(): T[] {
    return this.components;
  }
}
