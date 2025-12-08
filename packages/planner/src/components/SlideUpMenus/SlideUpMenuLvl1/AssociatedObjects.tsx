import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { MenuSection } from '@draw-house/ui/dist/components';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { Fragment } from 'react';
import assert from 'assert';
import { closeSlideUpMenuLvl1, SlideUpMenuLvl1Store, useSpaces } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { openSpaceSettingsSlideUpMenu } from '../../../utils/handlerHelpers/openSpaceSettingsSlideUpMenu';
import { openRoofSettingsSlideUpMenu } from '../../../utils/handlerHelpers/openRoofSettingsSlideUpMenu';
import { openCeilingSettingsSlideUpMenu } from '../../../utils/handlerHelpers/openCeilingSettingsSlideUpMenu';
import { openFloorSettingsSlideUpMenu } from '../../../utils/handlerHelpers/openFloorSettingsSlideUpMenu';
import { useCatalogDataResolved } from '../../../zustand/useCatalogData';

export type AssociatedObjectsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'associatedObjects' }>;
};

export const AssociatedObjects: React.FC<AssociatedObjectsProps> = ({
  slideUpMenuLvl1: {
    isOpened,
    spaceIds,
  },
}) => {
  checkIsNotNever(isOpened);

  const { spaces } = useSpaces();
  const { catalogData } = useCatalogDataResolved();

  const targetSpaces = isNull(spaceIds) ? [] : spaces.filter(e => spaceIds.includes(e.id));
  const [roofCategory] = catalogData.categories.filter(e => !isNull(e.appearanceType) && e.appearanceType === 'roofs');
  const [ceilingCategory] = catalogData.categories.filter(e => !isNull(e.appearanceType) && e.appearanceType === 'ceilings');
  const [floorCategory] = catalogData.categories.filter(e => !isNull(e.appearanceType) && e.appearanceType === 'floors');

  assert(!isUndefined(roofCategory), 'Something went wrong. |399p0b|');
  assert(!isUndefined(ceilingCategory), 'Something went wrong. |4bbc1t|');
  assert(!isUndefined(floorCategory), 'Something went wrong. |w7v1j0|');

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.associatedObjects.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
      noDivider
    >
      {
        targetSpaces.map(({ id, name, roofId }) => (
          <Fragment key={id}>
            <MenuSection
              type='buttonlike'
              title={`${lang.space} (${name})`}
              titleVariant='pale'
              image='/space-catalog-icon.svg'
              onClick={async () => {
                await openSpaceSettingsSlideUpMenu(id);
              }}
            />
            <MenuSection
              type='buttonlike'
              title={`${lang.roof} (${name})`}
              titleVariant='pale'
              image={!isNull(roofCategory.image) ? roofCategory.image : '/no-category.png'}
              onClick={async () => {
                await openRoofSettingsSlideUpMenu(roofId);
              }}
            />
            <MenuSection
              type='buttonlike'
              title={`${lang.ceiling} (${name})`}
              titleVariant='pale'
              image={!isNull(ceilingCategory.image) ? ceilingCategory.image : '/no-category.png'}
              onClick={async () => {
                await openCeilingSettingsSlideUpMenu(id);
              }}
            />
            <MenuSection
              type='buttonlike'
              title={`${lang.floor} (${name})`}
              titleVariant='pale'
              image={!isNull(floorCategory.image) ? floorCategory.image : '/no-category.png'}
              onClick={async () => {
                await openFloorSettingsSlideUpMenu(id);
              }}
            />
          </Fragment>
        ))
      }
    </SlideUpAndFloatingMenusWrapper>
  );
};
