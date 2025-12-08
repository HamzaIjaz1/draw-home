import { Express } from 'express';
import { mountFrontPlanImage } from './floorPlanImage';

export const mountRouter = (app: Express) => {
  mountFrontPlanImage(app);
};
