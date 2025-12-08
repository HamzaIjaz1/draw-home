import { styled } from 'styled-components';
import { isUndefined } from '@arthurka/ts-utils';
import { useCustomLogs } from '../zustand/useCustomLogs';

const CustomLogsWrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  text-align: right;
  pointer-events: none;
  font-family: Consolas, Menlo;
`;

export const CustomLogs: React.FC = () => {
  const { customLogs } = useCustomLogs();

  return customLogs.length > 0 && (
    <CustomLogsWrapper>
      {
        customLogs.slice(-50).map((e, i) => (
          <div key={i}>{e.map(e => isUndefined(e) ? 'undefined' : JSON.stringify(e)).join(' ')}</div>
        ))
      }
    </CustomLogsWrapper>
  );
};
