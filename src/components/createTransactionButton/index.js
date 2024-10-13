import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import SwitchButtonExpenseIncome from "./SwitchButtonToChooseOption";

const ButtonCreateTransaction = ({onTransactionCreate}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <Flex>
      <Button
        bg="#5AED83"
        color="white"
        leftIcon={<FontAwesomeIcon icon={faPlus} />}
        onClick={onOpen}
      >
        Create Transaction
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
          <ModalHeader><SwitchButtonExpenseIncome onTransactionCreate={onTransactionCreate}/></ModalHeader>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ButtonCreateTransaction;
