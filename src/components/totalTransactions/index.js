import { Card, CardBody, CardHeader, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TransactionService from "../../services/transaction";

const CardsTotalTransactions = ({dataTotal, dataTotalIncome, dataTotalExpense}) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [dataIncome, setDataIncome] = useState(null)
    const [dataExpense, setDataExpense] = useState(null)
    const textColor = '#1F1717';

  /* const grandTotal = async () => {
        try {
          const response = await TransactionService.totalTransactions()
          setData(response)
        } catch (error) {
          setError("Erro ao buscar dados da API");
        }
    } */


    
    useEffect(() => {
      setData(dataTotal);
  }, []);
  


  /*const incomeTotal = async () => {
    try {
      const response = await TransactionService.totalIncomeTransactions()
      setDataIncome(response)
    } catch (error) {
      setError("Erro ao buscar dados da API");
    }
} */



  useEffect(() => {
    setDataIncome(dataTotalIncome);
  }, []);


    /*const expenseTotal = async () => {
      try {
        const response = await TransactionService.totalExpenseTransactions()
        setDataExpense(response)
      } catch (error) {
        setError("Erro ao buscar dados da API");
      }
  } */



    useEffect(() => {
      setDataExpense(dataTotalExpense);
    }, []);

  return (
    <Flex 
      justify="center" 
      align="center" 
      flexDirection="column"
      mt="10px"
    >
      <Flex
        width="100%"
        maxWidth="1095px" 
        justify="space-between"
        gap="96px"
        flexWrap="wrap"
        mb="10px"
      >
        

        <Card color={textColor}
          backgroundColor='#5AED83' 
          width="301px" 
          height="114px"
          padding="4" // Padding para o cartão
          borderRadius="md"
          overflow="hidden" // Garante que o conteúdo não ultrapasse as bordas
        >
          <CardHeader padding='0'> 
            <Flex justifyContent="space-between" alignItems="center" mb="2">
              <Text fontWeight="bold">Total</Text>
              <Text fontWeight="bold" >Ganhos</Text>
            </Flex>
          </CardHeader>
          <CardBody padding='0'>
            <Flex alignItems="center" justifyContent="center" gap="1">
              <Text fontSize="lg" fontWeight="bold">R$</Text>
              <Text fontSize="3xl" fontWeight="bold">{dataTotalIncome ? dataTotalIncome.toLocaleString('pt-BR') : "0,00"}</Text>
            </Flex>
          </CardBody>
        </Card>
        <Card color={textColor}
          backgroundColor='#F87C7C' 
          width="301px" 
          height="114px"
          padding="4" 
          borderRadius="md"
          overflow="hidden"
        >
          <CardHeader padding='0'> 
            <Flex justifyContent="space-between" alignItems="center" mb="2">
              <Text fontWeight="bold" >Total</Text>
              <Text fontWeight="bold" >Gastos</Text>
            </Flex>
          </CardHeader>
          <CardBody padding='0'>
            <Flex alignItems="center" justifyContent="center" gap="1">
              <Text fontSize="lg" fontWeight="bold">R$</Text>
              <Text fontSize="3xl" fontWeight="bold">{dataTotalExpense ? dataTotalExpense.toLocaleString('pt-BR') : "0,00"}</Text>
            </Flex>
          </CardBody>
        </Card>


        <Card color={textColor}
          backgroundColor='#D9D9D9' 
          width="301px" 
          height="114px"
          padding="4" // Padding para o cartão
          borderRadius="md"
          overflow="hidden" // Garante que o conteúdo não ultrapasse as bordas
        >
          <CardHeader padding='0' > 
            <Flex justifyContent="space-between" alignItems="center" mb="2">
              <Text fontWeight="bold" >Total</Text>
            </Flex>
          </CardHeader>
          <CardBody padding='0'>
            <Flex alignItems="center" justifyContent="center" gap="1">
              <Text fontSize="lg" fontWeight="bold">R$</Text>
              <Text fontSize="3xl" fontWeight="bold">
                {dataTotal ? dataTotal.toLocaleString('pt-BR') : '0,00'}
              </Text>
            </Flex>
          </CardBody>
        </Card>
        {error && (
          <Text color="red" fontSize="lg" mt="4">
            {error}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}

export default CardsTotalTransactions;
