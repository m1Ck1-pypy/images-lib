import { Text } from '@gravity-ui/uikit';
import { Container } from './styles/Container';
import { Root } from './styles/Root';
import { useCallback, useRef, useState } from 'react';
import { Wrapper } from './styles/Wrapper';
import UploadImage from './UploadImage/UploadImage';
import { useDropzone } from 'react-dropzone';

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

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
    }

    // acceptedFiles.forEach((file) => {
    //   const reader = new FileReader();

    //   reader.onabort = () => console.log('file reading was aborted');
    //   reader.onerror = () => console.log('file reading has failed');
    //   reader.onload = () => {
    //     // Do whatever you want with the file contents
    //     const binaryStr = reader.result;
    //     console.log(binaryStr);
    //   };
    //   reader.readAsArrayBuffer(file);
    // });
    // try {
    // for (const file of acceptedFiles) {
    // const formData = new FormData();
    // formData.append('file', file);

    // const response = await axios.post('http://localhost:3000/upload', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // }
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    // }
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
