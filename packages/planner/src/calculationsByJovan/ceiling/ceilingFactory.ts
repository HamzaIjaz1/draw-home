// CeilingFactory.ts

import { FlatCeilingBuilder } from './builders/flatCeilingBuilder';
import { BeamCeilingBuilder } from './builders/beamCeilingBulder';
import { ShedCeilingBuilder } from './builders/shedCeilingBuilder';
import { CurvedCeilingBuilder } from './builders/curvedCeilingBuilder';
import { CeilingType } from './ceilingParameters';
import { BaseCeilingBuilder } from './builders/baseCeilingBuilder';

export class CeilingFactory {
  static getBuilder(type: CeilingType): BaseCeilingBuilder {
    switch(type) {
      case 'regular':
        return new FlatCeilingBuilder().setType(type);
      case 'dropped':
        return new FlatCeilingBuilder().setType(type);
      case 'coffered':
        return new FlatCeilingBuilder().setType(type);
      case 'tray':
        return new FlatCeilingBuilder().setType(type);
      case 'beam':
        return new BeamCeilingBuilder().setType(type);
      case 'shed':
        return new ShedCeilingBuilder().setType(type);
      case 'chatedral':
        return new ShedCeilingBuilder().setType(type);
      case 'cove':
        return new CurvedCeilingBuilder().setType(type);
      default:
        throw new Error(`Unsupported ceiling type: ${type}`);
    }
  }
}
