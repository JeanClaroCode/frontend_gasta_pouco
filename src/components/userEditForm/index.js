import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Input, Stack, Text, Alert, AlertIcon, AlertDescription, AlertTitle, CloseButton, Card, IconButton, InputGroup } from "@chakra-ui/react";
import DragAndDropUploader from './dragAndDropUploader';
import UsersEditService from '../../services/users-edit';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';




// Esquema de validação Zod
const profileSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'), 
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'), 
  newPassword: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres'), 
  image: z.any().nullable(), 
});

const EditProfile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema), 
  });

  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/esconder senha
  const [showNewPassword, setShowNewPassword] = useState(false); // Para nova senha
  const navigate = useNavigate(); // Hook para redirecionar



  const handleImageChange = (file) => {
    if (file) {
      setImage(file); 
    } else {
      console.error('Nenhum arquivo foi selecionado.');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); 
      setUserId(parsedUser._id); 
    }
  }, []);
  
  const onSubmit = async (data) => {
    setIsLoading(true); // Inicia o carregamento
    setShowAlert(false); // Esconde o alerta até a resposta

    if (!userId) {
      setMessage('Usuário não encontrado.');
      setIsSuccess(false);
      setIsLoading(false); // Para o carregamento
      setShowAlert(true); // Mostra o alerta de erro
      return;
    }
  
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('password', data.password);
    formData.append('newpassword', data.newPassword);
  
    try {
      await UsersEditService.userEdit(userId, data);

      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      storedUser.name = data.name; 
      localStorage.setItem('user', JSON.stringify(storedUser));

      if (image) {
        const profilePicResponse = await UsersEditService.uploadProfilePic(image, userId);
  
        if (profilePicResponse.url) {
          storedUser.profilePictureUrl = profilePicResponse.url;
          localStorage.setItem('user', JSON.stringify(storedUser));
        }
      }
      setMessage('Perfil atualizado com sucesso!');
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setMessage('Ocorreu um erro ao atualizar o perfil.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false); 
      setShowAlert(true);
    }
  };
  

  return (
    <>
      <Box width={["100%", "100%", "50%", "30%"]} mx="auto" p={4}> 
      {showAlert && (
              <Alert status={isSuccess ? 'success' : 'error'} 
              position="fixed" 
              top="10px"          
              left="50%" 
              transform="translate(-50%, 0)" 
              width={["90%", "90%", "60%", "50%"]} 
              borderRadius="lg" 
              zIndex={10}  
              bg={isSuccess ? '#5AED83' : '#F87C7C'}>
                <AlertIcon />
                <Box flex="1">
                  <AlertTitle>{isSuccess ? 'Sucesso!' : 'Erro!'}</AlertTitle>
                  <AlertDescription>
                  {isSuccess ? 'Perfil atualizado com sucesso!' : 'Ocorreu um erro ao atualizar o perfil.'}
                </AlertDescription>
                </Box>
                <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowAlert(false)} />
              </Alert>
            )}
        <Box textAlign="center" mb={3}>
          <Text fontSize={["lg", "2xl"]} fontWeight="bold">Editar Perfil</Text> {/* Tamanhos de fontes responsivos */}
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <Box mb={6}>
            <DragAndDropUploader onImageSelect={handleImageChange} />
          </Box>

          <Stack spacing={4} mb={4}>
              <Box>
                <label>Nome:</label>
                <Input
                  type="text"
                  variant="outline"
                  bg="white"
                  color="black"
                  border="1px solid #1F1717"
                  {...register('name')}
                  required
                />
                {errors.name && <p className="error-message">{errors.name.message}</p>}
              </Box>
              
              <Box  display="flex" flexDirection={["column", "column", "row"]} gap={2}> {/* Flex responsivo */}
                <Box flex="1" alignItems="center">
                  <label>Senha Atual:</label>
                <InputGroup>
                  <Input
                    color="black"
                    position="relative"
                    type={showPassword ? 'text' : 'password'}
                    variant="outline"
                    bg="white"
                    border="1px solid #1F1717"
                    {...register('password')}
                    required
                    pr="3rem" // Dá espaço à direita para o botão
                  />
                  <IconButton
                    color="black"
                    position="absolute"
                    top="50%"
                    right="0.5rem" // Ajuste de espaçamento
                    transform="translateY(-50%)"
                    aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    onClick={() => setShowPassword(!showPassword)}
                    bg="transparent"
                    _hover={{ bg: 'transparent' }}
                    zIndex={1} // Garante que o ícone fique acima do input
                  />
                </InputGroup>
                {errors.password && <p className="error-message">{errors.password.message}</p>}
              </Box>

              <Box flex="1" alignItems="center" position="relative">
                <label>Nova Senha:</label>
                <InputGroup>
                <Input
                  color="black"
                  type={showNewPassword ? 'text' : 'password'}
                  variant="outline"
                  bg="white"
                  border="1px solid #1F1717"
                  {...register('newPassword')}
                  required
                  pr="3rem" // Dá espaço à direita para o botão
                />
                <IconButton
                  color="black"
                  position="absolute"
                  top="50%"
                  right="0.5rem" // Ajuste de espaçamento
                  transform="translateY(-50%)"
                  aria-label={showNewPassword ? 'Esconder senha' : 'Mostrar senha'}
                  icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  bg="transparent"
                  _hover={{ bg: 'transparent' }}
                  zIndex={1} // Garante que o ícone fique acima do input
                />
                </InputGroup>
                {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}
              </Box>

              </Box>
          </Stack>

          <Box mt={4} textAlign="center">
            <Button
              type="submit"
              bg={isLoading ? "gray.400" : "#5AED83"}
              _hover={{ bg: isLoading ? "gray.400" : "#4CC66F" }}
              isDisabled={isLoading}
              color="#1F1717"
            >
              Salvar
            </Button>
          </Box>
          
        </form>
      </Box>
      
    </>
  );
};

export default EditProfile;
