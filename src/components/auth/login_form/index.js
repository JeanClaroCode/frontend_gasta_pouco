import React, { useState } from "react";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Input, Stack } from "@chakra-ui/react";
import UsersService from '../../../services/users';
import { Navigate } from "react-router-dom"; 

const loginSchema = z.object({
  email: z.string().email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [showAlert, setShowAlert] = useState(false);
  const [redirectToHome, setRedirectToHome] = useState(false);
  
  const onSubmit = async (data) => {
    try {
      const user = await UsersService.login(data); // Chamando a função de login do serviço
      console.log("Usuário logado:", user);
      if (!user._id) {
        setShowAlert(true);
      } else {
        setRedirectToHome(true); 
      }
    } catch (error) {
      console.error("Erro ao enviar dados de login", error);
      setShowAlert(true);
    }
  };

  if (redirectToHome) {
    return <Navigate to={{ pathname: "/" }} />;
  }

  return (
    <>
      {showAlert && (
        <Alert 
        status='error' 
        position="fixed" 
        top="10px"          
        left="50%" 
        transform="translate(-50%, 0)" 
        width="50%" 
        borderRadius="lg" 
        zIndex={10} 
        bg='#F87C7C'
      >
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Erro!</AlertTitle>
            <AlertDescription>
              Por favor, verifique seu email ou senha.
            </AlertDescription>
          </Box>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowAlert(false)} />
        </Alert>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="form-label">Email:</label>
          <Input type="email" variant='flushed'  {...register("email")} />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div>
          <label className="form-label">Senha:</label>
          <Input type="password" variant='flushed' {...register("password")} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <Stack align='center'>
          <Button mt={6} colorScheme="teal" type="submit">Confirmar</Button>
        </Stack>
      </form>
    </>
  );
}

export default LoginForm;
