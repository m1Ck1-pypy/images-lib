import { Text } from '@gravity-ui/uikit';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Container } from './styles/Container';
import { Root } from './styles/Root';
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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const props = {
    ...getRootProps(),
    onClick: handleUploadClick,
  };

  return (
    <Root>
      {!file ? (
        <Wrapper>
          <Container {...props}>
            {!isDragActive ? (
              <>
                <Text variant='display-1'>Нажмите для загрузки изображения</Text>
                <Text variant='display-1'>или</Text>
                <Text variant='display-1'>Перетащите изображение в поле</Text>
              </>
            ) : (
              <Text variant='display-1'>Отпустите изображение</Text>
            )}
          </Container>
        </Wrapper>
      ) : (
        <UploadImage file={file} onUploadFile={handleUploadClick} onClose={() => setFile(null)} />
      )}
      <input {...getInputProps()} ref={fileRef} type='file' onChange={handleFileChange} accept='image/*' hidden />
    </Root>
  );
};

export default Upload;
