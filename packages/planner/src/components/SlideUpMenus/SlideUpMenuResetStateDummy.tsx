import { SlideUpAndFloatingMenusWrapper } from '../SlideUpAndFloatingMenusWrapper';

export const SlideUpMenuResetStateDummy: React.FC = () => (
  <SlideUpAndFloatingMenusWrapper
    title=''
    opened={false}
    onClose={() => {}}
  >
    {null}
  </SlideUpAndFloatingMenusWrapper>
);
