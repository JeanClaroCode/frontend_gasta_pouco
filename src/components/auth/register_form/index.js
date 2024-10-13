import React, { useState } from "react";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, Input, Stack, VStack } from "@chakra-ui/react";
import UsersService from '../../../services/users'
import { Navigate } from "react-router-dom"; 

const loginSchema = z.object({
    name: z.string(),
    email: z.string().email("Formato de e-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  });
  
const RegisterForm = () => { 

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
      });

      const [showAlert, setShowAlert] = useState(false);
      const [isSuccess, setIsSuccess] = useState(false);
      const [redirectToLogin, setRedirectToLogin] = useState(false);

      const onSubmit = async (data) => {
        try {
          const user = await UsersService.register(data); 
          console.log("Usuário registrado:", user);

          if (!user._id){
            setIsSuccess(true)
            setShowAlert(true)
          }else{
            setIsSuccess(false);
            setShowAlert(true);
          }


        } catch (error) {
          console.error("Erro ao enviar dados de login", error);
        }
      };

      if(redirectToLogin)
        return <Navigate to={{pathname: "/login"}}/>



    return(
        <VStack>
        <form onSubmit={handleSubmit(onSubmit)}>
            {showAlert && (
              <Alert status={isSuccess ? 'success' : 'error'} 
              position="fixed" 
              top="10px"          
              left="50%" 
              transform="translate(-50%, 0)" 
              width="50%" 
              borderRadius="lg" 
              zIndex={10}  
              bg={isSuccess ? '#5AED83' : '#F87C7C'}>
                <AlertIcon />
                <Box flex="1">
                  <AlertTitle>{isSuccess ? 'Sucesso!' : 'Erro!'}</AlertTitle>
                  <AlertDescription>
                    {isSuccess ? 'Conta Criada com Sucesso': 'Ocorreu um erro durante a criação da conta'}
                  </AlertDescription>
                </Box>
                <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowAlert(false)} />
              </Alert>
            )}
            <div>
                <label className="form-label">Nome:</label>
                <Input type="name" variant='flushed' {...register("name")} />
                {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <div>
                <label className="form-label">Email:</label>
                <Input type="email" variant='flushed' {...register("email")} />
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
    </VStack>
    )
}

export default RegisterForm;