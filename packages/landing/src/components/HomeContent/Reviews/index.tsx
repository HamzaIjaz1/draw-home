import { FC, useEffect, useState } from 'react';
import assert from 'assert';
import { isNull } from '@arthurka/ts-utils';
import { useFadingReviews } from './useFadingReviews';
import { Avatar, Bio, Card, Carousel, Comment, Container, Job, Name, Texts } from './styles';
import { useWindowResize } from '../../../customHooks';
import { getCssVar } from '../../../utils';
import { cssVars } from '../../../commonStyles';

type Review = {
  name: string;
  job: string;
  review: string;
  image: string;
};

const items: Review[] = [
  {
    name: 'Emily, 29',
    job: 'Interior designer',
    review: 'DrawHome makes designing interiors easy and enjoyable. It\'s intuitive and perfect for seamless client collaboration.',
    image: '/reviews-emily-29.jpg',
  },
  {
    name: 'Alex, 26',
    job: 'Architecture student',
    review: '“DrawHome is a game-changer. Its simplicity helps me quickly create projects and focus on creativity.”',
    image: '/reviews-alex-26.jpg',
  },
  {
    name: 'Mary, 35',
    job: 'Homeowner',
    review: '“With no professional training, I used DrawHome to visualize my dream home and clearly share ideas with builders. I\'m thrilled!”',
    image: '/reviews-mary-35.jpg',
  },
  {
    name: 'Andy, 40',
    job: 'Engineer',
    review: 'DrawHome saves time and ensures precision. It’s perfect for plans and collaboration, improving my workflow.',
    image: '/reviews-andy-40.jpg',
  },
];

const deriveScrollbarWidth = (callback: (width: string) => void) => {
  const mainEl = document.querySelector('body main');
  assert(!isNull(mainEl), 'Something went wrong. |35g28d|');

  const parentEl = mainEl.parentElement;
  assert(!isNull(parentEl), 'Something went wrong. |9ip2ne|');

  const style = getComputedStyle(parentEl);
  assert(style.paddingLeft === style.paddingRight, 'Something went wrong. |0hrq79|');

  const paddingWoScrollbar = getCssVar(cssVars.pageSidePaddingWoScrollbar);
  const scrollbarWidth = `calc(${paddingWoScrollbar} - ${style.paddingLeft})`;
  callback(scrollbarWidth);
};

export const Reviews: FC = () => {
  const ref = useFadingReviews();

  const [scrollbarWidth, setScrollbarWidth] = useState('15px');

  const extractScrollbarWidth = () => deriveScrollbarWidth(setScrollbarWidth);

  useWindowResize(extractScrollbarWidth);

  useEffect(() => {
    extractScrollbarWidth();
  }, []);

  return (
    <Container $scrollbarWidth={scrollbarWidth}>
      <Carousel ref={ref}>
        {items.map(({ name, job, review, image }) => (
          <Card key={image}>
            <Bio>
              <Avatar
                src={image}
                alt={`photo of ${name}`}
                width={56}
                height={56}
                quality={100}
              />

              <Texts>
                <Name>{name}</Name>
                <Job>{job}</Job>
              </Texts>
            </Bio>

            <Comment>{review}</Comment>
          </Card>
        ))}
      </Carousel>
    </Container>
  );
};
