import styled, { css } from 'styled-components';
import { primaryColor } from '../../commonStyles';
import { Button } from '../ButtonOld';
import { DrawHouseOldIcon } from '../Icons';
import { SofiaPro } from '../../fonts';

const breakpointXl = '1400px';
const footerColor = 'rgb(30, 32, 37)';

export const Layout = styled.div`
  --layout-padding: 0;
  --title-margin: 60px 0 80px 0;
  --max-width-information-section: 420px;
  --information-section-padding: 40px 36px 24px 36px;
  --right-column-display: none;
  --left-column-width: 100%;
  --confirmation-buttons-direction: column;
  width: 100%;
  height: 100%;
  padding: var(--layout-padding);
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${footerColor};
  @media (min-width: ${breakpointXl}) {
  --layout-padding: 32px 94px;
  --title-margin: 60px 0;
  --max-width-information-section: 420px;
  --information-section-padding: 40px 5px 24px 0;
  --right-column-display: flex;
  --left-column-width: 50%;
  --confirmation-buttons-direction: row;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  perspective: 1000px;

  background-color: white;
  @media (min-width: ${breakpointXl}) {
    justify-content: unset;
  }
`;

export const StyledCloseButton = styled.button<{ $hideOnLaptop?: true }>`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: lightgray;
  position: absolute;
  top: 30px;
  right: 15px;
  display: ${p => p.$hideOnLaptop ? 'unset' : 'none'};
  @media (min-width: ${breakpointXl}) {
    display: ${p => p.$hideOnLaptop ? 'none' : 'unset'};
    right: 30px;
  }
`;

const Column = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const LeftColumn = styled(Column)<{ $isFlipped: boolean }>`
  align-items: center;
  width: var(--left-column-width);
  transition: transform 0.6s;
  transform-style: preserve-3d;
  ${p => p.$isFlipped && css`
    transform: rotateY(180deg);
  `}
`;

export const InformationLayout = styled.div<{ $face?: true; $shown?: boolean }>`
  height: 100%;
  width: 100%;
  max-width: var(--max-width-information-section);
  background-color: white;
  backface-visibility: hidden;
  overflow: hidden;

  ${p => p.$shown && css`
    overflow: auto;
    z-index: 1;
  `};

  ${p => p.$face ? css`
    position: absolute;
    width: 100%;
    height: 100%;
  ` : css`
    transform: rotateY(180deg) translateZ(1px);
  `}
`;

export const InformationSection = styled.div`
  height: 100%;
  width: 100%;
  padding: var(--information-section-padding);
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`;

export const RightColumn = styled(Column)`
  display: var(--right-column-display);
  align-items: center;
  justify-content: center;

  background: linear-gradient(143.55deg, #f86e33 0%, #ff5b4a 98.34%);
`;

export const ImageWrapper = styled.div`
  max-width: 100%;
  img {
    width: 100%;
    mix-blend-mode: multiply;
  }
`;

export const UnderImageText = styled.p`
  font-size: 24px;
  font-weight: 300;
  line-height: 28.13px;
  text-align: center;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: ${SofiaPro};
`;

export const StyledDrawHouseIcon = styled(DrawHouseOldIcon)`
  width: 16px;
  height: 26px;
`;

export const Title = styled.h1`
  margin: var(--title-margin);
  font-size: 32px;
  font-weight: 600;
  line-height: 32px;
`;

export const FormAndButtonsSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const ButtonsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SocialButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ConfirmationButtons = styled.div`
  width: 100%;
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: var(--confirmation-buttons-direction);
  gap: 16px;
`;

export const StyledConfirmationButton = styled(Button)`
  width: 100%;
  max-width: 200px;
  padding: 15px 20px;
  ${p => p.variant === 'primary' && css`
    box-shadow: 0px 7px 25px 0px rgba(255, 91, 74, 0.2);
  `}
  @media (min-width: ${breakpointXl}) {
    width: 50%;
  }
`;

export const ChangeSignTypeButton = styled(Button)`
  color: ${primaryColor};
`;

export const IconButton = styled(Button)`
  width: 50px;
  height: 50px;
`;

export const ChangeSignTypeWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
