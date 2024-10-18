import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Text, Image, Icon, Stack } from '@chakra-ui/react';
import { MdCloudUpload } from 'react-icons/md'; // Ícone de upload

const DragAndDropUploader = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedImage(Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));
    onImageSelect(file); 
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false, // Limitar a apenas um arquivo
  });

  return (
    <Box
      {...getRootProps()}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderWidth="2px"
      borderRadius="md"
      borderColor={isDragActive ? "teal.500" : "gray.200"}
      padding="6"
      textAlign="center"
      cursor="pointer"
      _hover={{ borderColor: "teal.400" }}
    >
      <input {...getInputProps()} />
      
      {!selectedImage ? (
        <Stack spacing={4} align="center">
          <Icon as={MdCloudUpload} w={10} h={10} color="gray.400" />
          <Text mt={2}>
            {isDragActive ? "Solte a imagem aqui..." : "Arraste uma imagem ou clique para selecionar"}
          </Text>
          <Button mt={4} colorScheme="teal">Selecionar Imagem</Button>
        </Stack>
      ) : (
        <Image
          src={selectedImage.preview}
          alt="Preview da Imagem"
          maxHeight="200px"
          maxWidth="200px"
          objectFit="cover"
          borderRadius="full"
        />
      )}
    </Box>
  );
};

export default DragAndDropUploader;
