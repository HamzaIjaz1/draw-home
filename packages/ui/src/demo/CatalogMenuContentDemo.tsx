import { memo, useState } from 'react';
import { MaterialCategoryPicker, MaterialPicker, MenuSection } from '../components';

const data = [
  {
    title: 'Construction',
    items: ['Doors', 'Windows', 'Columns'],
  },
  {
    title: 'Furniture',
    items: ['Kitchen', 'Bathroom'],
  },
];

export const CatalogMenuContentDemo = memo(() => {
  const [chosen, setChosen] = useState(false);
  const [chosenMaterialCategory, setChosenMaterialCategory] = useState<number>();
  const [chosenMaterial, setChosenMaterial] = useState<number>();

  if(chosen === true) {
    return (
      <>
        <MaterialCategoryPicker
          chosenOption={chosenMaterialCategory}
          onClick={id => setChosenMaterialCategory(id)}
          options={
            ['None', 'Paint', 'Tiles', 'Wallpapers', 'Panels', 'Plaster']
              .map((name, index) => ({
                id: index,
                image: 'https://placehold.co/56',
                name,
              }))
          }
          squareImages
          highlightVariant='background'
          size='sm'
        />
        <MaterialPicker
          shape='square'
          options={
            [
              '# F2F2F2',
              '# C5B2AE',
              '# A8B0A5',
              '# F8B0A5',
              '# E8B0A5',
              '# B8B0A5 Lorem ipsum',
              '# A8C0A5',
            ].map((name, i) => ({
              id: i,
              name,
              image: 'https://placehold.co/82',
            }))
          }
          chosenOption={chosenMaterial}
          onClick={idx => setChosenMaterial(idx)}
        />
      </>
    );
  }

  return (
    data.map(({ title, items }) => (
      <MenuSection
        key={title}
        title={title}
        type='collapsible'
        divider='summary'
        defaultExpanded
      >
        {items.map(subtitle => (
          <MenuSection
            key={subtitle}
            title={subtitle}
            type='buttonlike'
            titleVariant='pale'
            image='https://placehold.co/24'
            onClick={() => setChosen(true)}
          />
        ))}
      </MenuSection>
    ))
  );
});
