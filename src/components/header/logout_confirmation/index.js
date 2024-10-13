import React, { useState } from 'react';
import { Box, Flex, Link, Button, useColorMode, Image, useDisclosure } from '@chakra-ui/react';
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react';
import UsersService from './../../../services/users';
import { Navigate } from 'react-router-dom';

const LogoutConfirmation = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [redirectToLogin, setRedirectToLogin] = useState(false)
    
    const logOut = async () => {
        await UsersService.logout();
        setRedirectToLogin(true);
    };

    if(redirectToLogin) return < Navigate to="/login"/>

    return (
        <>
            <Button colorScheme='red' onClick={onOpen}>
                <FontAwesomeIcon icon={faRightFromBracket} color='red'/>
            </Button>
  
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Tem certeza que deseja sair da sua conta?
                        </AlertDialogHeader>
    
                        <AlertDialogBody fontSize='md'>
                            Você precisará fazer login novamente para acessar sua conta.
                        </AlertDialogBody>

    
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={logOut} ml={3}>
                                Deslogar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default LogoutConfirmation;
