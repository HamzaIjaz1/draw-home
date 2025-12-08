import styled from 'styled-components';
import { WithClassName } from '@draw-house/common/dist/utils';
import { FC } from 'react';
import { AtSignIcon } from '../Icons';
import { SofiaPro } from '../../fonts';
import { CONTACT_EMAIL } from '../../constants';
import { breakpointMd } from '../../commonStyles';

const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContactRow = styled.div<{ $white: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${p => p.$white === true ? '#fff' : '#222733'};
`;

const ContactText = styled.span<{ $white: boolean }>`
  font-family: ${SofiaPro};
  font-weight: 600;
  font-size: 15px;
  line-height: 1em;
  vertical-align: middle;
  color: ${p => p.$white === true ? '#fff' : '#222733'};
  @media (min-width: ${breakpointMd}) {
    font-size: 17px;
  }
`;

type ContactsProps = {
  white?: boolean;
};

export const Contacts: FC<ContactsProps & WithClassName> = ({ className, white = false }) => (
  <ContactsContainer className={className}>
    <a href={`mailto:${CONTACT_EMAIL}`}>
      <ContactRow $white={white}>
        <AtSignIcon />
        <ContactText $white={white}>{CONTACT_EMAIL}</ContactText>
      </ContactRow>
    </a>
  </ContactsContainer>
);
