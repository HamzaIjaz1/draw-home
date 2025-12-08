import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CARD_WIDTH_DESKTOP, CARD_WIDTH_MOBILE } from '../ProjectCard/constants';
import { TEMPLATE_BUTTON_WIDTH } from '../TemplateButton/styles';

export const TemplatesLayout = styled('div')(({ theme }) => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${TEMPLATE_BUTTON_WIDTH}, 1fr));
  justify-items: center;
  gap: ${theme.spacing(5, 3)};

  ${theme.breakpoints.up('md')} {
    gap: ${theme.spacing(7, 5)};
  }
`);

export const ProjectsLayout = styled('div')(({ theme }) => css`
  --project-card-width: ${CARD_WIDTH_MOBILE};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--project-card-width), 1fr));
  justify-items: center;
  gap: ${theme.spacing(3)};

  ${theme.breakpoints.up('md')} {
    --project-card-width: ${CARD_WIDTH_DESKTOP};
  }
`);

export const SuggestionText = styled(Typography)(({ theme }) => css`
  font-size: 19px;
  font-weight: 600;
  line-height: 19px;
  text-align: center;
  color: ${theme.palette.common.black};
`);

export const SuggestionWrap = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(4)};

  ${theme.breakpoints.up('md')} {
    flex-direction: row;
    justify-content: space-evenly;
    gap: 0;
  }
`);
