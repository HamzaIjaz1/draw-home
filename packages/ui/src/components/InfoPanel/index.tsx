import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { MouseEvent } from 'react';
import { isUndefined } from '@arthurka/ts-utils';
import { IconButton } from '../IconButton';
import { createStyledOptions } from '../../utils/createStyledOptions';

type ContainerProps = {
  biggerBottomPadding: boolean;
};
const opts = createStyledOptions<ContainerProps>({
  biggerBottomPadding: true,
});
const Container = styled('div', opts)<ContainerProps>(({ biggerBottomPadding }) => css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 358px;
  max-width: calc(100vw - 10px);
  ${biggerBottomPadding === true
    ? css`padding: 10px 10px 15px;`
    : css`padding: 10px;`}
  border-radius: 16px;

  background-color: #f1f1f1;
  box-shadow: 0 0 1px 1px rgba(200, 200, 200, 0.5);
`);

const TitleRow = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  align-items: center;
`;

const TitleText = styled('span')(({ theme }) => css`
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.primary};
  overflow-wrap: anywhere;
  padding-right: 4px;
`);

const ControlRow = styled('div')`
  display: flex;
  justify-content: flex-end;
`;

const DescriptionText = styled('p')(({ theme }) => css`
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: anywhere;
  margin: 0;
`);

export type InfoPanelProps = {
  title: string;
  description: string;
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
  onStartQuickTour?: (e: MouseEvent<HTMLButtonElement>) => void;
  onOpenTutorials?: (e: MouseEvent<HTMLButtonElement>) => void;
  onPrevious?: (e: MouseEvent<HTMLButtonElement>) => void;
  onNext?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const InfoPanel = ({
  className,
  title,
  description,
  onClose,
  onStartQuickTour,
  onOpenTutorials,
  onPrevious,
  onNext,
}: InfoPanelProps & WithClassName) => (
  <Container
    className={className}
    biggerBottomPadding={isUndefined(onPrevious) && isUndefined(onNext)}
  >
    <TitleRow>
      <TitleText>{title}</TitleText>
      {!isUndefined(onStartQuickTour) && (
        <IconButton
          icon='playCircled'
          variant='text'
          state='active'
          size='xs'
          onClick={onStartQuickTour}
        />
      )}
      {!isUndefined(onOpenTutorials) && (
        <IconButton
          icon='infoBook'
          variant='text'
          state='active'
          size='xs'
          onClick={onOpenTutorials}
        />
      )}
      <IconButton
        icon='closeNoBackground'
        variant='text'
        size='xs'
        onClick={onClose}
      />
    </TitleRow>

    <DescriptionText>{description}</DescriptionText>

    {isUndefined(onPrevious) && isUndefined(onNext) ? null : (
      <ControlRow>
        <IconButton
          icon='downArrow'
          rotate={90}
          variant='text'
          size='xs-mobile'
          {
            ...isUndefined(onPrevious)
              ? { state: 'disabled', onClick: () => {} }
              : { state: 'active', onClick: onPrevious }
          }
        />
        <IconButton
          icon='downArrow'
          rotate={-90}
          variant='text'
          size='xs-mobile'
          {
            ...isUndefined(onNext)
              ? { state: 'disabled', onClick: () => {} }
              : { state: 'active', onClick: onNext }
          }
        />
      </ControlRow>
    )}

  </Container>
);
