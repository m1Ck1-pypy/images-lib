import { useEffect } from 'react';
import Carusel from './Carusel/Carusel';
import { Container } from './styles/Container';
import { GridWrapper } from './styles/GridWrapper';
import { Image } from './styles/Image';
import { Root } from './styles/Root';

import { useGalleryStore } from '@/utils/store/gallery';
import { Text } from '@gravity-ui/uikit';

const Gallery = () => {
  const activeIndex = useGalleryStore((state) => state.activeImageIndex);
  const imageArray = useGalleryStore((state) => state.allImages);
  const setActiveImageIndex = useGalleryStore((state) => state.setActiveImageIndex);
  const resetIndex = useGalleryStore((state) => state.resetIndex);

  const handleImageClick = (e: any, index: number) => {
    e.stopPropagation();
    setActiveImageIndex(index);
  };

  const handleResetActiveIndex = () => {
    resetIndex();
  };

  useEffect(() => {
    return () => resetIndex();
  }, []);

  return (
    <Root onClick={handleResetActiveIndex}>
      {activeIndex === null && (
        <Container>
          {imageArray.length ? (
            <GridWrapper>
              {imageArray.map((item, index) => (
                <Image key={index} image={item} onClick={(e) => handleImageClick(e, index)} />
              ))}
            </GridWrapper>
          ) : (
            <Text variant='display-1'>Галерея пуста</Text>
          )}
        </Container>
      )}

      {activeIndex !== null && <Carusel image={imageArray[activeIndex]} />}
    </Root>
  );
};

export default Gallery;
