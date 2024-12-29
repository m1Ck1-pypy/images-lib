import { ArrowsRotateLeft, FloppyDisk, Xmark } from '@gravity-ui/icons';
import { Button, Icon, Tooltip } from '@gravity-ui/uikit';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGalleryStore } from '@/utils/store/gallery';

import { Actions } from './styles/Actions';
import { Image } from './styles/Image';
import { ImageWrapper } from './styles/ImageWrapper';

type Props = {
  file: File;
  onUploadFile: () => void;
  onClose: () => void;
};

const UploadImage = ({ file, onUploadFile, onClose }: Props) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLImageElement>(null);
  const setAllImage = useGalleryStore((state) => state.setImage);

  const handleSaveImage = () => {
    setAllImage(URL.createObjectURL(file));
    onClose();
    navigate('/');
  };

  return (
    <ImageWrapper>
      <Image ref={ref} image={URL.createObjectURL(file)} alt='Uploaded' />
      <Actions>
        <Tooltip content='Удалить' placement='bottom' openDelay={300}>
          <Button view='outlined-danger' size='l' onClick={onClose}>
            <Icon data={Xmark} size={20} />
          </Button>
        </Tooltip>
        <Tooltip content='Изменить' placement='bottom' openDelay={300}>
          <Button view='outlined-info' size='l' onClick={onUploadFile}>
            <Icon data={ArrowsRotateLeft} size={20} />
          </Button>
        </Tooltip>
        <Tooltip content='Сохранить' placement='bottom' openDelay={300}>
          <Button view='outlined-success' size='l' onClick={handleSaveImage}>
            <Icon data={FloppyDisk} size={20} />
          </Button>
        </Tooltip>
      </Actions>
    </ImageWrapper>
  );
};

export default UploadImage;
