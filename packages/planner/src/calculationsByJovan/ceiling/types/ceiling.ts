// ceiling.ts
import { CeilingParameters } from '../ceilingParameters';


export abstract class BaseCeiling {
  protected params: CeilingParameters;

  constructor(params: CeilingParameters) {
    this.params = params;
    // this.initialize();
  }

  protected abstract initialize(): void;
}
