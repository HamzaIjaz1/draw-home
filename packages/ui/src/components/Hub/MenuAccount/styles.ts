import Typography from '@mui/material/Typography';
import MuiChip from '@mui/material/Chip';
import MuiAvatar from '@mui/material/Avatar';
import { css, styled } from '@mui/material';
import { textOverflowEllipsis } from '../../../utils/styles';

export const Container = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  width: var(--left-menu-width, 250px);
  gap: ${theme.spacing(15)};
  padding: ${theme.spacing(7.5, 9, 15)};
`);

export const MainHeading = styled(Typography)(({ theme }) => css`
  font-size: 20px;
  font-weight: 500;
  line-height: 25.5px;
  text-align: left;
  overflow-wrap: break-word;
  color: ${theme.palette.text.primary};
`);

export const SecondaryHeading = styled(Typography)(({ theme }) => css`
  font-size: 15px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0.5px;
  text-align: left;
  overflow-wrap: break-word;
  color: ${theme.palette.text.primary};
`);

export const Avatar = styled(MuiAvatar)`
  width: 50px;
  height: 50px;
`;

export const Chip = styled(MuiChip)`
  height: 30px;
`;

export const ChipText = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  text-align: left;

  max-width: 80px;
  ${textOverflowEllipsis}
`;
