import React, { useEffect, useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import IncomeEditForm from "../EditIncomeForm";
import ExpenseEditForm from "../EditExpenseForm";
import TransactionService from "../../../../services/transaction";
import moment from "moment";



const SwitchEditButtonExpenseIncome = ({onTransactionCreate, transactionId}) => { 
  const [active, setActive] = useState("ganhos");
  const [transaction, setTransaction] = useState(null);

  const fetchTransaction = async () => {
      try {
          const response = await TransactionService.GetTransaction(transactionId);
          setTransaction(response.data.data);
      } catch (error) {
          console.error("Erro ao buscar transação:", error);
      }
  };

  useEffect(() => {
      fetchTransaction();
  }, [transactionId]);

  useEffect(() => {
      if (transaction && transaction.type === "expense") {
          setActive("gastos");
      } else if (transaction) {
          setActive("ganhos");
      }
  }, [transaction]);
    return (
        <>
        <Flex
            position="relative"
            width="250px"
            borderRadius="full"
            overflow="hidden"
            border="2px solid #000"
            bg="white"
            justifyContent="space-between"
            alignItems="center"
        >
          <Box
            position="absolute"
            top="0"
            left={active === "ganhos" ? "0" : "50%"}
            width="50%"
            height="100%"
            bg={active === "ganhos" ? "#5AED83" : "#F87C7C"}
            borderRadius="full"
            transition="left 0.3s ease, background-color 0.3s ease"
          />
          
          <Button
            zIndex="1"
            flex="1"
            bg="transparent"
            color={active === "ganhos" ? "black" : "gray.500"}
            borderRadius="0"
            fontWeight="bold"
            _hover={{ bg: "transparent" }}
            onClick={() => setActive("ganhos")}
          >
            Ganhos
          </Button>
    
          {/* Texto do Gastos */}
          <Button
            zIndex="1"
            flex="1"
            bg="transparent"
            color={active === "gastos" ? "black" : "gray.500"}
            borderRadius="0"
            fontWeight="bold"
            _hover={{ bg: "transparent" }}
            onClick={() => setActive("gastos")}
          >
            Gastos
          </Button>
        </Flex>

        {active === "ganhos" ?   
                <IncomeEditForm onTransactionCreate={onTransactionCreate} transaction={transaction} /> 
                : 
                <ExpenseEditForm onTransactionCreate={onTransactionCreate} transaction={transaction} />}
        </>
      );
  };

export default SwitchEditButtonExpenseIncome

