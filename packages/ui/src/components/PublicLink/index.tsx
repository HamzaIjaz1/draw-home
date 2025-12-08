import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { isNull, wait } from '@arthurka/ts-utils';
import { useState } from 'react';
import { menuHorizontalGutterWidth } from '../../utils/styles';
import { MainButton } from '../MainButton';
import { createStyledOptions } from '../../utils/createStyledOptions';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 ${menuHorizontalGutterWidth}px;
`;

const Title = styled('span')(({ theme }) => css`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);

const CopyArea = styled('div')`
  display: flex;
  gap: 10px;
  position: relative;
`;

const CopyableText = styled('span')(({ theme }) => css`
  display: inline-block;
  width: 100%;
  height: 36px;
  padding: 8px;
  border-radius: 8px;
  background-color: #f3f3f3;

  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  user-select: all;
`);

const Button = styled(MainButton)`
  width: 104px;
  height: 36px;
  flex-shrink: 0;

  gap: 6px;
  padding: 6px;
  border-radius: 10px;

  .MuiTypography-root {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: center;
  }
`;

type StatusProps = {
  visible: boolean;
};

const StatusOpts = createStyledOptions<StatusProps>({
  visible: true,
});

const Status = styled('span', StatusOpts)<StatusProps>(({ theme, visible }) => css`
  position: absolute;
  border-radius: 30px;
  padding: 6px 8px;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #5e5e5eea;

  font-size: 14px;
  color: ${theme.palette.background.default};
  opacity: ${visible === true ? 1 : 0};
  visibility: ${visible === true ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease-in-out;
  user-select: none;
`);

export type PublicLinkProps = {
  title: string;
  url: string;
  buttonText: string;
  copySuccessStatusText: string;
};

let timeoutId: number | null = null;

export const PublicLink = ({
  className,
  title,
  url,
  buttonText,
  copySuccessStatusText,
}: PublicLinkProps & WithClassName) => {
  const [showStatus, setShowStatus] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      const selection = window.getSelection();
      if(!isNull(selection)) {
        selection.removeAllRanges();
      }

      if(!isNull(timeoutId)) {
        setShowStatus(false);
        window.clearTimeout(timeoutId);
        await wait(0.15);
      }

      setShowStatus(true);

      timeoutId = window.setTimeout(() => setShowStatus(false), 1000);
    } catch(error) {
      console.error('|c028kh|', error);
    }
  };

  return (
    <Container className={className}>
      <Title>{title}</Title>
      <CopyArea>
        <CopyableText onClick={onCopy}>{url}</CopyableText>
        <Button
          icon='chain'
          text={buttonText}
          onClick={onCopy}
        />
        <Status visible={showStatus}>{copySuccessStatusText}</Status>
      </CopyArea>
    </Container>
  );
};
