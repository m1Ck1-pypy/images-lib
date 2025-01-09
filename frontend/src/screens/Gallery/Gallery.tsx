import { Text } from '@gravity-ui/uikit';
import { useEffect } from 'react';

import { useGalleryStore } from '@/utils/store/gallery';

import Carusel from './Carusel/Carusel';
import { Container } from './styles/Container';
import { GridWrapper } from './styles/GridWrapper';
import { Image } from './styles/Image';
import { Root } from './styles/Root';

const Gallery = () => {
  const activeIndex = useGalleryStore((state) => state.activeImageIndex);
  const imageArray = useGalleryStore((state) => state.allImages);
  console.log('🚀 ~ imageArray:', imageArray);
  const setActiveImageIndex = useGalleryStore((state) => state.setActiveImageIndex);
  const resetIndex = useGalleryStore((state) => state.resetIndex);
  const fetchAllImages = useGalleryStore((state) => state.fetchAllImages);

  const handleImageClick = (e: any, index: number) => {
    e.stopPropagation();
    setActiveImageIndex(index);
  };

  const handleResetActiveIndex = () => {
    resetIndex();
  };

  useEffect(() => {
    fetchAllImages();

    return () => resetIndex();
  }, [resetIndex]);

  return (
    <Root onClick={handleResetActiveIndex}>
      {activeIndex === null && (
        <Container>
          {imageArray.length ? (
            <GridWrapper>
              {imageArray.map((item, index) => (
                <Image key={index} image={item.image} onClick={(e) => handleImageClick(e, index)} />
              ))}
            </GridWrapper>
          ) : (
            <Text variant='display-1' style={{ marginTop: '2rem' }}>
              Галерея пуста
            </Text>
          )}
        </Container>
      )}

      {activeIndex !== null && <Carusel image={imageArray[activeIndex].image} id={imageArray[activeIndex].id} />}
    </Root>
  );
};

export default Gallery;
