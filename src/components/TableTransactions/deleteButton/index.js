import { Button, Checkbox, useDisclosure, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box } from "@chakra-ui/react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from "react";
import TransactionService from "../../../services/transaction";

const DeleteButton = ({ transactionId, onTransactionCreate }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();  // Para o botão "Cancelar"
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);  
    const [showAlert, setShowAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {

        const isChecked = localStorage.getItem('dontShowDeleteModal') === 'true';
        setChecked(isChecked);
    }, []);

    const deleteTransaction = async () => { 
        setLoading(true);
        try {
            await TransactionService.Delete(transactionId);
            onTransactionCreate();
            onClose();
            setIsSuccess(true);
            setShowAlert(true);
        } catch (error) {
            console.error(error);
            setIsSuccess(false);
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = () => {
        if (checked) {
            deleteTransaction();
        } else {
            onOpen();
        }
    };

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);
        localStorage.setItem('dontShowDeleteModal', isChecked);  // Salvar a preferência no localStorage
    };

    return (
        <>
            <Button p='0' m='0' display="block" className="button" aria-label="Delete Button" onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrash} style={{ fontSize: '15px' }} />
            </Button>    
            {showAlert && (
                <Alert 
                    status={isSuccess ? 'success' : 'error'}  
                    position="fixed" 
                    top="10px"          
                    left="50%" 
                    transform="translate(-50%, 0)" 
                    width="50%" 
                    borderRadius="lg" 
                    zIndex={10}  
                    bg={isSuccess ? '#5AED83' : '#F87C7C'}
                >
                    <AlertIcon />
                    <Box flex="1">
                        <AlertTitle>{isSuccess ? 'Sucesso!' : 'Erro!'}</AlertTitle>
                        <AlertDescription>
                            {isSuccess ? 'Transação deletada com sucesso.' : 'Ocorreu um erro durante a operação.'}
                        </AlertDescription>
                    </Box>
                    <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowAlert(false)} />
                </Alert>
            )}

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Tem certeza que deseja deletar essa transação?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <p>Esta ação não poderá ser desfeita.</p>
                            <Checkbox 
                                mt={4} 
                                isChecked={checked} 
                                onChange={handleCheckboxChange}
                            >
                                Não mostrar isso novamente
                            </Checkbox>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button 
                                colorScheme='red' 
                                onClick={deleteTransaction} 
                                ml={3}
                                isLoading={loading}
                            >
                                Apagar Transação
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteButton;
