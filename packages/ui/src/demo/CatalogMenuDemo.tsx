import { memo, useState } from 'react';
import { MainButton, MenuItem, SearchInput, SlideUpMenu } from '../components';
import { negate } from '../utils/negate';
import { CatalogMenuContentDemo } from './CatalogMenuContentDemo';

export const CatalogMenuDemo = memo(() => {
  const title = 'Catalog';
  const [open, setOpen] = useState(false);
  const [searchCatalogValue, setSearchCatalogValue] = useState('');

  return (
    <>
      <MainButton
        icon='plus'
        onClick={() => setOpen(negate)}
        text={title}
        variant={open === true ? 'text' : 'contained'}
      />

      <SlideUpMenu
        title={title}
        onClose={() => setOpen(false)}
        opened={open}
        headerSpacing={{ bottom: 'xl' }}
        header={
          <MenuItem paddingHorizontal>
            <SearchInput
              placeholder='Search'
              value={searchCatalogValue}
              setValue={setSearchCatalogValue}
            />
          </MenuItem>
        }
      >
        <CatalogMenuContentDemo />
      </SlideUpMenu>
    </>
  );
});
