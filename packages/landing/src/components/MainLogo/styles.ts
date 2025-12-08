import styled from 'styled-components';
import { DrawHouseIcon } from '../Icons';
import { SofiaPro } from '../../fonts';
import { primaryColor } from '../../commonStyles';

export const Container = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
`;

export const LogoIcon = styled(DrawHouseIcon)`
  width: 36px;
  height: 36px;

  @media (min-width: 1100px) {
    width: 50px;
    height: 50px;
  }
`;

const textTop = '-2px';

export const LogoText = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 22px;
  line-height: 1em;
  vertical-align: middle;
  color: #8b8b8b;

  em {
    color: #222733;
  }

  @media (min-width: 1100px) {
    font-size: 24px;
    position: relative;
    top: ${textTop};
  }
`;

const badgeBottom = '15px';

export const Badge = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  padding: 2.5px 0 1.5px;
  border-radius: 2px;
  transform: rotate(16.2deg);
  position: absolute;
  bottom: ${badgeBottom};
  right: -20px;

  font-family: ${SofiaPro};
  font-weight: 700;
  font-size: 9px;
  line-height: 1em;
  vertical-align: middle;
  color: #fff;
  background-color: ${primaryColor};
  user-select: none;

  @media (min-width: 1100px) {
    bottom: calc(${badgeBottom} + (-1 * ${textTop}));
  }
`;
