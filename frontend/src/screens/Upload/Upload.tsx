import { Text } from '@gravity-ui/uikit';
import { Container } from './styles/Container';
import { Root } from './styles/Root';
import { useRef, useState } from 'react';
import { Wrapper } from './styles/Wrapper';
import UploadImage from './UploadImage/UploadImage';

const Upload = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleUploadClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <Root>
      {!file ? (
        <Wrapper>
          <Container onClick={handleUploadClick}>
            <Text variant='display-1'>Нажмите для загрузки изображения</Text>
            <Text variant='display-1'>или</Text>
            <Text variant='display-1'>Перетащите изображение в поле</Text>
          </Container>
        </Wrapper>
      ) : (
        <UploadImage file={file} onUploadFile={handleUploadClick} onClose={() => setFile(null)} />
      )}
      <input ref={fileRef} type='file' onChange={handleFileChange} accept='image/*' hidden />
    </Root>
  );
};

export default Upload;
