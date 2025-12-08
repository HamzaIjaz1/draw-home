import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { WithClassName } from '@draw-house/common/dist/utils';
import { useEffect, useState } from 'react';
import { isUndefined } from '@arthurka/ts-utils';
import { Tabs, TabsProps } from '.';

export type AnnotatedTabsProps = {
  chosenTab: TabsProps['chosenTab'];
  children: TabsProps['children'];
  onClick: TabsProps['onClick'];
  levelName: string;
  annotation?: string;
  annotationDetails?: string;
};

const Anchor = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Annotation = styled(Typography)`
  --lineHeight: 16px;

  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: var(--lineHeight);
  text-align: center;
  color: #31bcfd;
`;

const LiveHint = styled(Typography)(({ theme }) => css`
  --lineHeight: 16px;

  margin-top: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: var(--lineHeight);
  text-align: center;
  color: ${theme.palette.text.disabled};
  white-space: normal;
  word-break: break-word;
`);

const hasText = (e: string | undefined) => (
  !isUndefined(e) && e.trim().length > 0
);

export const AnnotatedTabs = ({
  className,
  chosenTab,
  children,
  onClick,
  annotation,
  annotationDetails,
  levelName,
}: AnnotatedTabsProps & WithClassName) => {
  const [visible, setVisible] = useState(true);

  const hasAnyAnnotation = hasText(annotation) || hasText(annotationDetails);

  useEffect(() => {
    if(hasAnyAnnotation === false) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timeout = window.setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [hasAnyAnnotation, annotation, annotationDetails]);

  const annotationDisplay = hasText(annotation) === true && hasAnyAnnotation && visible ? 'block' : 'none';
  const liveHintText = hasAnyAnnotation === true && visible === true ? annotationDetails : levelName;
  const liveHintDisplay = hasText(liveHintText) === true ? 'block' : 'none';

  return (
    <Anchor className={className}>
      <Tabs
        chosenTab={chosenTab}
        onClick={onClick}
      >
        {children}
      </Tabs>
      <Annotation noWrap style={{ display: annotationDisplay }}>
        {annotation}
      </Annotation>
      <LiveHint style={{ display: liveHintDisplay }}>
        {liveHintText}
      </LiveHint>
    </Anchor>
  );
};
