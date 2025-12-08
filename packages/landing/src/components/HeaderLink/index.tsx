import Link from 'next/link';
import { css, styled } from 'styled-components';
import { SofiaPro } from '../../fonts';
import { primaryColor } from '../../commonStyles';

const NavLink = styled(Link)<{ $highlight: boolean }>`
  position: relative;
  padding: 0 2px;

  overflow: hidden;
  color: #222733;

  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 17px;
  line-height: 1em;
  vertical-align: middle;

  ${p => p.$highlight === true && css`
    text-decoration: ${primaryColor} underline solid 1.5px;
    text-underline-position: under;
  `}
`;

type HeaderLinkProps = {
  href: string;
  children: string;
  highlight?: boolean;
};

export const HeaderLink: React.FC<HeaderLinkProps> = ({
  href,
  children,
  highlight = false,
}) => (
  <NavLink
    href={href}
    $highlight={highlight}
  >
    {children}
  </NavLink>
);
