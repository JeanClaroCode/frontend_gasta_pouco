import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, CloseButton, FormControl, FormLabel, Input, Select, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import moment from "moment";
import TransactionService from "../../../../services/transaction";
/*import TransactionService from "../../../services/transaction";*/

const transactionSchema = z.object({
  type: z.string(),
  amount: z.union([z.string(), z.number()])
    .refine((value) => !isNaN(Number(value)), {
      message: "O valor deve ser um número válido",
    })
    .transform((value) => Number(value)),
  category: z.string(),
  date: z.string(), 
  description: z.string(),
});


const ExpenseEditForm = ({onTransactionCreate, transaction }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(transactionSchema),
  });

  const formatDate = (isoDate) => {
    const formatingDate = moment.utc(isoDate).format('YYYY/MM/DD')
    const formattedDate = formatingDate.replace(/\//g, "-");
    return formattedDate
  }

  const expenseCategories = [
    { value: "Mercado", label: "Mercado" },
    { value: "Transporte", label: "Transporte" },
    { value: "Aluguel", label: "Aluguel" },
    { value: "Educação", label: "Educação" },
    { value: "Lazer", label: "Lazer" },
    { value: "Saúde", label: "Saúde" },
    { value: "Restaurante", label: "Restaurante" },
    { value: "Compras", label: "Compras" },
    { value: "Viagem", label: "Viagem" },
    { value: "Serviços", label: "Serviços" },
  ];

  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    if(transaction) {
      reset ({
        type: transaction.type? 'expense' : 'income',
        amount: transaction.amount || '',
        category: transaction.category || '',
        date: formatDate(transaction.date) || '',
        description: transaction.description || '',
      })
    }
  }, [transaction, reset]);

  const onSubmit = async (data) => {
    try {
      const editedTransaction = await TransactionService.Edit(transaction._id, data);
      console.log("Transação editada com sucesso:", editedTransaction.data);
      onTransactionCreate(editedTransaction.data)
      console.log("Transação registrada:", transaction);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      console.error("Erro ao criar Transação", error);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };


  return (
    <>
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
              {isSuccess ? 'Transação editada com sucesso': 'Ocorreu um erro durante a operação.'}
            </AlertDescription>
          </Box>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setShowAlert(false)} />
        </Alert>
      )}
      
      <Box as="form" onSubmit={handleSubmit(onSubmit)} borderRadius="md" color="white" display="flex" flexDirection="column" alignItems="flex-start" width="250px">
      <FormControl display="flex" mt={1}> 
        <FormControl alignItems="center" mr={3}> 
          <FormLabel color="white" mb={0}>Valor</FormLabel>
          <Input placeholder="R$" type="number" width="98px"  {...register("amount")} />
          {errors.amount && <p>{errors.amount.message}</p>}
        </FormControl>

        <FormControl mt={6}>
          <Select placeholder="Categoria" bg="white" color="black" width="140px" border="3px solid" borderColor="#F87C7C" {...register("category")}>
            {expenseCategories.map((expense, index) => (
              <option key={index} value={expense.value}>
                {expense.label}
              </option>
            ))}
          </Select>
          {errors.category && <p>{errors.category.message}</p>}
        </FormControl>
      </FormControl>

        <FormControl mt={4} bg="white" color="black" borderRadius="10px">
          <Input placeholder='Select Date' size='md' type='date' {...register("date")} />
          {errors.date && <p>{errors.date.message}</p>}
        </FormControl>

        <FormControl mt={5}>
          <Textarea bg="white" color="black" placeholder="Descreva o item aqui..." height="100px"  {...register("description")} />
          {errors.description && <p>{errors.description.message}</p>}
        </FormControl>

        <FormControl display="flex" justifyContent="center" alignItems="center">
          <Button bg="#F87C7C" mt={5} mb={5} type="submit" width="50%">Editar</Button>
        </FormControl>
      </Box>
    </>
  );
};

export default ExpenseEditForm;
