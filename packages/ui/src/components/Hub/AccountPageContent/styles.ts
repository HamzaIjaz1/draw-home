import { css, styled } from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';
import { TitledIsle } from '../CommonPageComponents';

export const PaddedTitledIsle = styled(TitledIsle)`
  .MuiAccordionDetails-root {
    padding-left: 12px;
    padding-right: 12px;
  }
`;

export const AvatarAndFormContainer = styled('div')(({ theme }) => css`
  display: flex;
  width: 100%;
  margin-bottom: 62px;

  ${theme.breakpoints.down('md')} {
    flex-direction: column;
  }
`);

export const Avatar = styled(MuiAvatar)(({ theme }) => css`
  width: 100px;
  height: 100px;
  outline: 1px solid ${theme.palette.primary.main};
`);

export const AvatarContainer = styled('div')(({ theme }) => css`
  padding-right: 40px;
  margin-bottom: 40px;

  ${theme.breakpoints.down('md')} {
    padding-right: 0;
    display: flex;
    justify-content: center;
  }
`);

export const AvatarButton = styled('button')`
  all: unset;
  border-radius: 50%;
  cursor: pointer;
`;

export const MainFormContainer = styled('div')`
  width: 100%;
`;

export const BottomLinksContainer = styled('div')`
  display: flex;
  justify-content: space-between;
`;
