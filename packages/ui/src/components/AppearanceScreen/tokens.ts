/**
 * Figma design tokens for Appearance screen.
 * Relative units (%, vw, vh) for responsive layout across screen sizes.
 */
export const appearanceTokens = {
  /** Relative units for layout (scale with viewport) */
  rel: {
    /** Sidebar width: ~20.3vw (390/1920), clamped in CSS */
    sidebarWidth: '20.3125vw',
    /** Sidebar margin from viewport edges */
    sidebarMarginV: '1.5vw',
    sidebarMarginH: '1.5vh',
    /** Header height */
    headerHeight: '5vh',
    /** Content padding as % of sidebar */
    contentPadding: '4%',
    contentGap: '1.5vw',
    /** Header padding */
    headerPadding: '4%',
    /** Gaps between sections / elements */
    gapSm: '0.5vw',
    gapMd: '1vw',
    gapLg: '1.5vw',
    /** Icon/button sizes relative to viewport */
    iconSm: '1.25vw',
    iconMd: '2vw',
    /** Swatch size (min/max applied in styles) */
    swatchSize: '2.9vw',
    swatchSmall: '1.56vw',
    /** Border radius */
    radiusSm: '0.5vw',
    radiusMd: '0.83vw',
    radiusLg: '1vw',
  },
  colors: {
    accent: '#FD5631',
    black: '#19172C',
    white: '#FFFFFF',
    gray100: '#F3F3F3',
    gray200: '#E9E9E9',
    gray400: '#999999',
    gray600: '#777777',
    gray700: '#5E5E5E',
    grayInputBg: '#F0F0F0',
    graySwatchBorder: '#DCD9D9',
    grayBorder: '#BABABA',
    brown: '#988F85',
    brownDark: '#8A7362',
    beige: '#DDCDA6',
    beigeLight: '#F3E6D4',
    cream: '#FFE5C0',
    offWhite: '#DEDDD1',
    blueGray: '#ADB8C0',
    darkBlueGray: '#434A54',
    darkGreenGray: '#868578',
    wall: '#C5BEAE',
    windowFrame: '#957D68',
  },
  shadow: {
    toolButton: '2px 2px 10px 0px rgba(0,0,0,0.2)',
    toolButtonBadge: '-1px -1px 8px 0px rgba(0,0,0,0.2)',
    modal: '0px 0px 10px 0px rgba(0,0,0,0.3)',
    aiButton: '0px 0px 10px 0px rgba(253,86,49,0.5)',
  },
  size: {
    toolButton: 52,
    toolButtonIcon: 24,
    planningTabsHeight: 54,
    planningTabsWidth: 406,
    planningTabsGap: 6,
    planningTabsPadding: 6,
    planningTabBorderRadius: 10,
    planningTabsBorderRadius: 16,
    modalWidth: 390,
    modalBorderRadius: 16,
    modalHeaderHeight: 54,
    modalContentPadding: 16,
    modalContentGap: 24,
    searchFieldHeight: 40,
    smallIconButton: 40,
    swatchSize: 56,
    swatchSizeSmall: 30,
    sectionGap: 16,
    chipBorderRadius: 4,
    inputBorderRadius: 8,
  },
  typography: {
    title: { fontSize: 19, fontWeight: 500 },
    sectionTitle: { fontSize: 17, fontWeight: 500 },
    body: { fontSize: 17, fontWeight: 400 },
    bodySmall: { fontSize: 14, fontWeight: 500 },
    label: { fontSize: 12, fontWeight: 400 },
    badge: { fontSize: 11, fontWeight: 600 },
    tab: { fontSize: 22, fontWeight: 400 },
  },
} as const;
