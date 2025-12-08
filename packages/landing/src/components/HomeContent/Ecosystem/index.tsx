import { GraduateCapIcon, HeadsetIcon, HouseIcon, SpeechBubblesIcon } from '../../Icons';
import { BlogCard, BlogImage, CommunityCard, Container, Description, IconContainer, LinkLabel, SupportCard, TextBlock, Title, TutorialsCard, TutorialsImage } from './styles';

export const Ecosystem: React.FC = () => (
  <Container>
    <CommunityCard>
      <TextBlock>
        <IconContainer><HouseIcon /></IconContainer>
        <Title>Community</Title>
        <Description>Connect with creators, share projects, exchange tips, and get inspired — whether you&apos;re a beginner or a pro.</Description>
        <a href='https://community.drawhome.com'>
          <LinkLabel>Join to Us</LinkLabel>
        </a>
      </TextBlock>
    </CommunityCard>

    <BlogCard>
      <TextBlock>
        <IconContainer><SpeechBubblesIcon /></IconContainer>
        <Title>Blog</Title>
        <Description>
          Explore expert insights, feature highlights, and real stories from the world of design and architecture. Stay updated and inspired.
        </Description>
        <a href='https://blog.drawhome.com'>
          <LinkLabel>Learn More About Us</LinkLabel>
        </a>
      </TextBlock>

      <BlogImage
        src='/ecosystem-blog-phone.png'
        alt='building showcase'
        width={3000}
        height={2250}
        quality={100}
      />
    </BlogCard>

    <SupportCard>
      <TextBlock>
        <IconContainer><HeadsetIcon /></IconContainer>
        <Title>Support</Title>
        <Description>
          Search FAQs, contact our support team, or chat with us live. We&apos;re always ready to help with anything — technical or design-related.
        </Description>
        <a href='https://community.drawhome.com/c/support'>
          <LinkLabel>Get help & support</LinkLabel>
        </a>
      </TextBlock>
    </SupportCard>

    <TutorialsCard>
      <TextBlock>
        <IconContainer><GraduateCapIcon /></IconContainer>
        <Title>Tutorials</Title>
        <Description>
          Quick-start videos and step-by-step guides to master everything — from walls and roofs to 3D walkthroughs and AI tools.
        </Description>
        <a href='https://community.drawhome.com/c/tutorials'>
          <LinkLabel>Browse tutorials</LinkLabel>
        </a>
      </TextBlock>

      <TutorialsImage
        src='/ecosystem-tutorials-floorplan.png'
        alt='building showcase'
        width={320}
        height={247}
        quality={100}
      />
    </TutorialsCard>
  </Container>
);
