import styled from 'styled-components';
import { WithClassName } from '@draw-house/common/dist/utils';
import { IconBadge, IconBadgeProps } from '../IconBadge';
import { BallIcon, FacebookIcon, InstagramIcon, TwitterIcon } from '../Icons';

const Container = styled.ul`
  width: fit-content;
  display: flex;
  gap: 14px;
`;

const links = [
  { icon: <FacebookIcon />, url: '/facebook' },
  { icon: <TwitterIcon />, url: '/twitter' },
  { icon: <BallIcon />, url: '/unknown-media' },
  { icon: <InstagramIcon />, url: '/instagram' },
];

type SocialMediaLinksProps = {
  theme?: IconBadgeProps['theme'];
};

export const SocialMediaLinks: React.FC<SocialMediaLinksProps & WithClassName> = ({
  className,
  theme,
}) => (
  <Container className={className}>
    {links.map(({ url, icon }) => (
      <li key={url}>
        <a href={url}>
          <IconBadge variant='outlined' theme={theme}>
            {icon}
          </IconBadge>
        </a>
      </li>
    ))}
  </Container>
);
