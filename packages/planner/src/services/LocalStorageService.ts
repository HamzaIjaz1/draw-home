import { z } from 'zod/v4';
import { isNull, isUndefined, ObjKeys } from '@arthurka/ts-utils';
import { isProjectId, ProjectId } from '@draw-house/common/dist/brands';
import { infoPanelFeatures } from '../constants';

const quickTourKey = 'quickTourCompleted';
const infoPanelKey = {
  onboarding: 'infoPanel_v2_onboarding',
  seenFeatureTips: 'infoPanel_v2_seenFeatureTips',
} satisfies Record<string, `infoPanel_v2_${string}`>;
const recentColorsKey = 'recentColors';
const recentTexturesKey = 'recentTextures';

const infoPanelSeenFeatureTipsSchema = z.array(z.enum(ObjKeys(infoPanelFeatures)));

const infoPanelOnboardingSchema = z.enum([
  'closed-popup',
  'finished',
]);

const recentColorsSchema = z.array(
  z.object({
    id: z.custom<ProjectId>(isProjectId, { message: 'Invalid ProjectId' }).nullable(),
    colors: z.array(z.string()).max(10),
  }),
);

const recentTextureItemSchema = z.object({
  textureId: z.number().int().nonnegative(),
  wScale: z.number().nonnegative().gte(0.01).default(1),
  lScale: z.number().nonnegative().gte(0.01).default(1),
  rotateDeg: z.number().default(0),
  color: z.string(),
});

const recentTexturesSchema = z.array(
  z.object({
    id: z.custom<ProjectId>(isProjectId, { message: 'Invalid ProjectId' }).nullable(),
    textures: z.array(recentTextureItemSchema).max(5),
  }),
);

const recentTexturesLegacySchema = z.array(
  z.object({
    id: z.custom<ProjectId>(isProjectId, { message: 'Invalid ProjectId' }).nullable(),
    textures: z.array(z.number()).max(5),
  }),
);

type Onboarding = z.infer<typeof infoPanelOnboardingSchema>;
type RecentColors = z.infer<typeof recentColorsSchema>;
type RecentTextureItem = z.infer<typeof recentTextureItemSchema>;
type RecentTextures = z.infer<typeof recentTexturesSchema>;

export const LocalStorageService = {
  quickTour: {
    isCompleted: {
      get() {
        return localStorage.getItem(quickTourKey) === 'true';
      },
      set(value: boolean) {
        localStorage.setItem(quickTourKey, value.toString());
      },
    },
  },
  infoPanel: {
    onboarding: {
      get() {
        const item = localStorage.getItem(infoPanelKey.onboarding);

        return isNull(item) ? 'not-initiated' : infoPanelOnboardingSchema.parse(item);
      },
      set(e: Onboarding) {
        localStorage.setItem(infoPanelKey.onboarding, e);
      },
    },
    seenFeatureTips: {
      get() {
        const item = localStorage.getItem(infoPanelKey.seenFeatureTips);

        return isNull(item) ? [] : infoPanelSeenFeatureTipsSchema.parse(JSON.parse(item));
      },
      set(features: Array<keyof typeof infoPanelFeatures>) {
        localStorage.setItem(infoPanelKey.seenFeatureTips, JSON.stringify([...new Set(features)]));
      },
    },
  },
  recentColors: {
    get(): RecentColors {
      const item = localStorage.getItem(recentColorsKey);
      const list = isNull(item) ? [] : recentColorsSchema.parse(JSON.parse(item));
      return list.map(group => ({
        ...group,
        colors: group.colors.toReversed(),
      }));
    },
    set(id: ProjectId | null, color: string): void {
      const item = localStorage.getItem(recentColorsKey);
      const list: RecentColors = isNull(item)
        ? []
        : recentColorsSchema.parse(JSON.parse(item));

      const entry = list.find(e => e.id === id);

      if(entry === undefined) {
        list.push({ id, colors: [color] });
      } else {
        const idx = entry.colors.indexOf(color);
        if(idx !== -1) {
          entry.colors.splice(idx, 1);
        }
        entry.colors.push(color);
        if(entry.colors.length > 10) {
          entry.colors.shift();
        }
      }

      localStorage.setItem(recentColorsKey, JSON.stringify(list));
    },
  },
  recentTextures: {
    get(): RecentTextures {
      const raw = localStorage.getItem(recentTexturesKey);
      if(isNull(raw)) {
        return [];
      }

      try {
        const list = recentTexturesSchema.parse(JSON.parse(raw));
        return list.map(group => ({
          ...group,
          textures: group.textures.toReversed(),
        }));
      } catch(e) {
        const legacy = recentTexturesLegacySchema.parse(JSON.parse(raw));
        const migrated: RecentTextures = legacy.map(group => ({
          id: group.id,
          textures: group.textures.map<RecentTextureItem>(textureId => ({
            textureId,
            wScale: 1,
            lScale: 1,
            rotateDeg: 0,
            color: '#fff',
          })).toReversed(),
        }));

        localStorage.setItem(recentTexturesKey, JSON.stringify(migrated));
        return migrated;
      }
    },

    set(id: ProjectId | null, texture: RecentTextureItem): void {
      const raw = localStorage.getItem(recentTexturesKey);

      let list: RecentTextures;
      if(isNull(raw)) {
        list = [];
      } else {
        try {
          list = recentTexturesSchema.parse(JSON.parse(raw));
        } catch(e) {
          const legacy = recentTexturesLegacySchema.parse(JSON.parse(raw));
          list = legacy.map(group => ({
            id: group.id,
            textures: group.textures.map<RecentTextureItem>(textureId => ({
              textureId,
              wScale: 1,
              lScale: 1,
              rotateDeg: 0,
              color: '#fff',
            })),
          }));
        }
      }

      let entry = list.find(e => e.id === id);
      if(isUndefined(entry)) {
        entry = { id, textures: [] };
        list.push(entry);
      }

      const existsIdentical = entry.textures.some(e => (
        true
          && e.textureId === texture.textureId
          && e.wScale === texture.wScale
          && e.lScale === texture.lScale
          && e.rotateDeg === texture.rotateDeg
          && e.color.toLowerCase() === texture.color.toLowerCase()
      ));

      if(existsIdentical === true) {
        return;
      }

      entry.textures = entry.textures.filter(e => e.textureId !== texture.textureId);
      entry.textures.push(texture);

      if(entry.textures.length > 5) {
        entry.textures.splice(0, entry.textures.length - 5);
      }

      localStorage.setItem(recentTexturesKey, JSON.stringify(list));
    },
  },
};
