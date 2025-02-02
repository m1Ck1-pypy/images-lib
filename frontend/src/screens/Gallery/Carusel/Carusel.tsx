import { useViewportSize } from '@gravity-ui/uikit';
import { AnimatePresence, PanInfo } from 'framer-motion';
import { useRef, useState } from 'react';

import LeftArrow from '@/assets/leftArrow.png';
import RightArrow from '@/assets/rightArrow.png';
import { useGalleryStore } from '@/utils/store/gallery';

import { Arrow } from './styles/Arrow';
import { Image } from './styles/Image';
import { Root } from './styles/Root';
import Wrapper from './styles/Wrapper';

type Props = {
  id: string;
  image: string;
};

const transition = {
  type: 'spring',
  stiffness: 200,
  damping: 80,
};

type Move = 'left' | 'right';

const Carusel = ({ image, id }: Props) => {
  const width = useViewportSize().width || 0;

  const incremetImageIndex = useGalleryStore((state) => state.incrementIndex);
  const decrementImageIndex = useGalleryStore((state) => state.decrementIndex);
  const index = useGalleryStore((state) => state.activeImageIndex) || 0;

  const [move, setMove] = useState<Move>('left');

  const handleNextImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    incremetImageIndex();
    setMove('left');
  };

  const handlePrevImage = (e: any) => {
    e.stopPropagation();
    decrementImageIndex();
    setMove('right');
  };

  const handleDragEnd = (event: React.MouseEvent<HTMLDivElement>, info: PanInfo) => {
    if (info.offset.x < -50) {
      handleNextImage(event);
    } else if (info.offset.x > 50) {
      handlePrevImage(event);
    }
  };

  const initial = { opacity: 0.5, x: move === 'right' ? -100 : 100 };
  const animate = { opacity: 1, x: 0 };
  const exit = { opacity: 0.5, x: move === 'right' ? 100 : -100 };

  const constraintsRef = useRef<HTMLDivElement>(null);

  const isMobileView = width < 768;

  return (
    <AnimatePresence>
      <Root>
        {!isMobileView && <Arrow arrow={LeftArrow} onClick={(e) => handlePrevImage(e)} />}
        <Wrapper ref={constraintsRef} onClick={(e: any) => e.stopPropagation()}>
          <Image
            key={`${id}-${index}-blur`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={transition}
            image={image}
            blur={true}
            size='cover'
          />
          <Image
            key={`${id}-${index}`}
            initial={initial}
            animate={animate}
            exit={exit}
            transition={transition}
            image={image}
            size='contain'
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          />
        </Wrapper>
        {!isMobileView && <Arrow arrow={RightArrow} onClick={(e) => handleNextImage(e)} />}
      </Root>
    </AnimatePresence>
  );
};

export default Carusel;
