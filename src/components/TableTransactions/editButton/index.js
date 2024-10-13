import { Box, Button, Flex, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {useDisclosure} from "@chakra-ui/react";
import '../../../styles/transactions.scss'
import { faPen } from "@fortawesome/free-solid-svg-icons";
import SwitchButtonExpenseIncome from "../../createTransactionButton/SwitchButtonToChooseOption";
import SwitchEditButtonExpenseIncome from "./SwitchEditButtonToChooseOption";
import TransactionService from "../../../services/transaction";

const EditButton = ({ transactionId, onTransactionCreate}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return ( 
        <> 
        <Flex>
            <Button className="button" aria-label="Edit Button" onClick={onOpen}>
                <FontAwesomeIcon icon={faPen} style={{ fontSize: '15px' }} /*onClick={() => handleEdit(transaction)}*/ />
            </Button>
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset="slideInBottom"
            >
                <ModalOverlay backdropFilter='blur(10px)' />
                <ModalContent bg='#1F1717' 
                    justifyContent="center" // Centraliza horizontalmente
                    alignItems="center" 
                    width="350px" 
                    borderRadius="20px"
                >
                <ModalHeader><SwitchEditButtonExpenseIncome transactionId={transactionId} onTransactionCreate={onTransactionCreate}/></ModalHeader>
                <ModalCloseButton />
                </ModalContent>
            </Modal>
        </Flex>  
        </>
    )
};

export default EditButton