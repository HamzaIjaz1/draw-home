/**
 * Appearance panel body: Texture Search, Recent/My Textures, Materials, Textures,
 * Color Overlay, Recent Colors, Preview, Transparency, Blend Mode, Name.
 * Pixel-perfect to Figma node 22450:143414.
 */
import { appearanceScreenAssets as a } from './assets';
import { appearanceTokens as t } from './tokens';
import {
  Chip,
  ChipsRow,
  ColorSwatchCircle,
  ColorSwatchItem,
  ColorSwatchLabel,
  ColorSwatchRow,
  CompareLabel,
  FieldInput,
  FieldLabel,
  FieldRow,
  MyTexturesBadge,
  MyTexturesLabel,
  MyTexturesText,
  NameInput,
  NameInputText,
  NameRow,
  PreviewArea,
  PreviewCheckboxRow,
  PreviewHeader,
  PreviewInputLabel,
  PreviewInputRow,
  PreviewSection,
  RecentColorsRow,
  RecentColorDot,
  RecentPill,
  RecentPillBadge,
  RecentPillText,
  RecentMyTexturesLeft,
  RecentMyTexturesRow,
  RecentRowAddButton,
  SectionTitle,
  SectionTitleRow,
  SearchField,
  SearchIcon,
  SearchPlaceholder,
  SearchRow,
  SmallIconButton,
  SmallInput,
  SmallInputText,
  SliderInput,
  SliderRow,
  SliderTrack,
  SwatchCircle,
  SwatchItem,
  SwatchLabel,
  SwatchRow,
  SwatchRowSection,
  TransparencyLabel,
  TransparencyRow,
} from './styles';

export function AppearancePanelContent() {
  const colorOverlayHexes = [
    '#FFE5C0',
    '#F3E6D4',
    '#988F85',
    '#DEDDD1',
    '#ADB8C0',
    '#DDCDA6',
    '#8A7362',
    '#868578',
    '#434A54',
  ] as const;
  const recentColors = [
    t.colors.brown,
    t.colors.beigeLight,
    '#6AA84F',
    t.colors.blueGray,
    t.colors.beige,
    t.colors.brownDark,
    t.colors.brownDark,
    t.colors.darkBlueGray,
    t.colors.darkBlueGray,
    '#110846',
  ];

  return (
    <>
      <SearchRow>
        <SearchField>
          <SearchIcon>
            <img src={a.imgFrame} alt="" />
          </SearchIcon>
          <SearchPlaceholder>Texture Search</SearchPlaceholder>
        </SearchField>
        <SmallIconButton type="button" aria-label="Recent">
          <img src={a.imgVector4} alt="" />
        </SmallIconButton>
        <SmallIconButton type="button" aria-label="My textures">
          <img src={a.imgVector7} alt="" />
        </SmallIconButton>
        <SmallIconButton type="button" aria-label="Add">
          <img src={a.imgVector3} alt="" />
        </SmallIconButton>
      </SearchRow>

      <RecentMyTexturesRow>
        <RecentMyTexturesLeft>
          <RecentPill>
            <RecentPillText>Recent </RecentPillText>
            <RecentPillBadge>125</RecentPillBadge>
          </RecentPill>
          <MyTexturesLabel>
            <MyTexturesText>My Textures</MyTexturesText>
            <MyTexturesBadge>0</MyTexturesBadge>
          </MyTexturesLabel>
        </RecentMyTexturesLeft>
        <RecentRowAddButton type="button" aria-label="Add texture">
          <img src={a.imgVector3} alt="" />
        </RecentRowAddButton>
      </RecentMyTexturesRow>

      {/* Section under Recent: texture swatches row (Plain, Stucco, #DDCDA6, Brick) */}
      <SwatchRowSection>
      <SwatchRow>
        {[
          { label: 'Plain', bg: t.colors.brown },
          { label: 'Stucco', img: a.imgImage133 },
          { label: '#DDCDA6', bg: t.colors.beige },
          { label: 'Briсk', img: a.imgImage63 },
        ].map(({ label, bg, img }) => (
          <SwatchItem key={label}>
            <SwatchCircle $border>
              {img ? <img src={img} alt="" /> : <span style={{ width: '100%', height: '100%', background: bg, borderRadius: '100px' }} />}
            </SwatchCircle>
            <SwatchLabel>{label}</SwatchLabel>
          </SwatchItem>
        ))}
      </SwatchRow>
      </SwatchRowSection>

      {/* Divider - use a 1px line asset or border */}
      <div style={{ width: '100%', height: 1, background: t.colors.grayBorder, opacity: 0.5 }} />

      {/* Materials: Roof (active) / All */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: t.size.sectionGap }}>
        <SectionTitleRow>
          <SectionTitle>Materials</SectionTitle>
          <ChipsRow>
            <Chip $active>Roof</Chip>
            <Chip>All</Chip>
          </ChipsRow>
        </SectionTitleRow>
        <SwatchRow>
          {[
            { label: 'Plain', selected: true, black: true },
            { label: 'Shingles', img: a.imgImage, img2: a.imgImage125 },
            { label: 'Metal', img: a.imgImage63, img2: a.imgImage1 },
            { label: 'Tile', img: a.imgImg8493 },
          ].map(({ label, selected, black, img, img2 }) => (
            <SwatchItem key={label}>
              <SwatchCircle $selected={selected} $border>
                {black && <span style={{ position: 'absolute', inset: 0, background: '#000', borderRadius: '100px' }} />}
                {img && <img src={img} alt="" />}
                {img2 && <img src={img2} alt="" style={{ position: 'absolute', inset: 0 }} />}
              </SwatchCircle>
              <SwatchLabel>{label}</SwatchLabel>
            </SwatchItem>
          ))}
        </SwatchRow>
      </div>

      <div style={{ width: '100%', height: 1, background: t.colors.grayBorder, opacity: 0.5 }} />

      {/* Textures */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: t.size.sectionGap }}>
        <SectionTitleRow>
          <SectionTitle>Textures</SectionTitle>
          <img src={a.imgVector1} alt="" style={{ width: 24, height: 24 }} />
        </SectionTitleRow>
        <SwatchRow>
          {[
            { label: 'Monolith', img: a.imgImage64 },
            { label: 'Concrete Block', selected: true, img: a.imgImage65 },
            { label: 'Facade', img: a.imgImage66 },
            { label: 'Slag Block', img: a.imgImage67 },
            { label: 'Foamed', img: a.imgImage68 },
            { label: 'Other', img: a.imgImage70 },
          ].map(({ label, selected, img }) => (
            <SwatchItem key={label}>
              <SwatchCircle $selected={selected} $border>
                {img && <img src={img} alt="" />}
              </SwatchCircle>
              <SwatchLabel>{label}</SwatchLabel>
            </SwatchItem>
          ))}
        </SwatchRow>
      </div>

      <div style={{ width: '100%', height: 1, background: t.colors.grayBorder, opacity: 0.5 }} />

      {/* Color Overlay */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: t.size.sectionGap }}>
        <SectionTitleRow>
          <SectionTitle>Color Overlay</SectionTitle>
          <img src={a.imgVector1} alt="" style={{ width: 24, height: 24 }} />
        </SectionTitleRow>
        <ColorSwatchRow>
          {colorOverlayHexes.map((hex, i) => (
            <ColorSwatchItem key={hex}>
              <ColorSwatchCircle
                $selected={hex === '#868578'}
                style={{ backgroundColor: hex }}
              />
              <ColorSwatchLabel>{hex}</ColorSwatchLabel>
            </ColorSwatchItem>
          ))}
          <ColorSwatchItem>
            <ColorSwatchCircle>
              <img src={a.imgOpsi6H01} alt="" />
            </ColorSwatchCircle>
            <ColorSwatchLabel>More</ColorSwatchLabel>
          </ColorSwatchItem>
        </ColorSwatchRow>
      </div>

      {/* Recent Colors */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: t.size.sectionGap }}>
        <SectionTitle>Recent Colors</SectionTitle>
        <RecentColorsRow>
          {recentColors.map((color, i) => (
            <RecentColorDot
              key={`${color}-${i}`}
              style={{ backgroundColor: color }}
              $border={i === 1}
            />
          ))}
        </RecentColorsRow>
      </div>

      {/* Preview */}
      {/* <PreviewSection>
        <PreviewHeader>
          <SectionTitle style={{ flex: 1 }}>Preview</SectionTitle>
          <PreviewCheckboxRow as="label">
            <input type="checkbox" defaultChecked aria-label="Compare to Original" style={{ width: 24, height: 24, accentColor: t.colors.accent }} />
            <CompareLabel>Compare to Original</CompareLabel>
          </PreviewCheckboxRow>
        </PreviewHeader>
        <PreviewArea>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 0,
              width: 187,
              height: 187,
              borderRadius: 1000,
              border: `0.8px solid ${t.colors.grayBorder}`,
              background: t.colors.graySwatchBorder,
              overflow: 'hidden',
            }}
          >
            <img
              src={a.imgImage71}
              alt=""
              style={{
                position: 'absolute',
                left: '50%',
                marginLeft: 9,
                top: -10,
                width: 251,
                height: 251,
                objectFit: 'cover',
              }}
            />
          </div>
          <div style={{ position: 'absolute', right: 0, top: 26, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <PreviewInputRow>
                <PreviewInputLabel>W</PreviewInputLabel>
                <SmallInput>
                  <SmallInputText>0.50 m</SmallInputText>
                </SmallInput>
              </PreviewInputRow>
              <img src={a.imgFrame1} alt="" style={{ width: 20, height: 20 }} />
              <PreviewInputRow>
                <PreviewInputLabel>L</PreviewInputLabel>
                <SmallInput>
                  <SmallInputText>0.50 m</SmallInputText>
                </SmallInput>
              </PreviewInputRow>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <img src={a.imgHugeiconsRotate01} alt="" style={{ width: 20, height: 20 }} />
              <SmallInput style={{ flex: 1 }}>
                <SmallInputText>45°</SmallInputText>
              </SmallInput>
            </div>
          </div>
        </PreviewArea>
      </PreviewSection> */}

      {/* Transparency */}
      {/* <TransparencyRow>
        <TransparencyLabel>Transparency</TransparencyLabel>
        <SliderRow>
          <SliderTrack />
          <SliderInput>
            <SmallInputText>0.988</SmallInputText>
          </SliderInput>
        </SliderRow>
      </TransparencyRow> */}

      {/* Blend Mode */}
      {/* <FieldRow>
        <FieldLabel>Blend Mode</FieldLabel>
        <FieldInput>
          <SmallInputText style={{ flex: 1 }}>Multiply</SmallInputText>
          <img src={a.imgVector23} alt="" style={{ width: 24, height: 24 }} />
        </FieldInput>
      </FieldRow> */}

      {/* Name */}
      {/* <NameRow>
        <FieldLabel style={{ flex: 1 }}>Name</FieldLabel>
        <NameInput>
          <NameInputText>Chantilly Lace</NameInputText>
        </NameInput>
        <button type="button" aria-label="Add to favorites" style={{ width: 24, height: 24, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}>
          <img src={a.imgVector} alt="" style={{ display: 'block', width: '100%', height: '100%' }} />
        </button>
      </NameRow> */}
    </>
  );
}
