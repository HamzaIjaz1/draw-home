import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import {
  FloorHeightHintIcon as BaseFloorHeightHintIcon,
  LevelElevationHintIcon as BaseLevelElevationHintIcon,
} from '../Icons';
import { BaseRow } from '../BaseRow';

export const Container = styled(BaseRow)`
  gap: 10px;
  width: unset;
  flex: 1;
`;

export const Inputs = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const Label = styled('label')`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const LevelElevationHintIcon = styled(BaseLevelElevationHintIcon)`
  min-width: 24px;
  min-height: 24px;
`;

export const FloorHeightHintIcon = styled(BaseFloorHeightHintIcon)`
  min-width: 24px;
  min-height: 24px;
`;

export const LabelTypography = styled(Typography)(({ theme }) => css`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.secondary};
  word-break: break-word;
`);
