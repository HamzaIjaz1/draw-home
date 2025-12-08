import styled from 'styled-components';
import { DrawHouseFooterIcon } from '../Icons';
import { SofiaPro } from '../../fonts';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoIcon = styled(DrawHouseFooterIcon)`
  width: 36px;
  height: 36px;
  @media (min-width: 1000px) {
    width: 50px;
    height: 50px;
  }
`;

export const LogoText = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 22px;
  line-height: 1em;
  vertical-align: middle;
  color: #fff;

  @media (min-width: 1000px) {
    font-size: 46px;
    line-height: 56px;
  }
`;
