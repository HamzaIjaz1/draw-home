import styled from 'styled-components';
import { lang } from '../lang';
import { useIsFirstPersonView } from '../zustand/useIsFirstPersonView';
import { useIsMouseControlStarted } from '../zustand/useIsMouseControlStarted';

const InitialInfoContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 30px;
  border-radius: 12px;
  font-size: 16px;
  text-align: center;
  z-index: 1000;
  pointer-events: none;
  max-width: 300px;
`;
const Title = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;
const InfoText = styled.div`
  margin-bottom: 10px;
`;
const ExitInfoContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;
  z-index: 1000;
  pointer-events: none;
`;

export const FirstPersonViewInfo: React.FC = () => {
  const { isFirstPersonView } = useIsFirstPersonView();
  const { isMouseControlStarted } = useIsMouseControlStarted();

  return (
    isFirstPersonView === false
      ? null
      : isMouseControlStarted === false
        ? (
          <InitialInfoContainer>
            <Title>{lang.firstPersonView.title}</Title>
            {
              lang.firstPersonView.info.map((e, i) => (
                <InfoText key={i}>{e}</InfoText>
              ))
            }
          </InitialInfoContainer>
        )
        : (
          <ExitInfoContainer>
            {lang.firstPersonView.exit}
          </ExitInfoContainer>
        )
  );
};
