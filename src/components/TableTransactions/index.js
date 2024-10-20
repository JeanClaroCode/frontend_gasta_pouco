import { Box, Button, Card, CircularProgress, Table, TableContainer, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChevronLeft, faChevronRight, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "../searchInput";
import CategoryLogic from "./categoryLogic";
import moment from 'moment';
import '../../styles/tableTransactions.scss'
import ButtonCreateTransaction from "../createTransactionButton";
import EditButton from "./editButton";
import DeleteButton from "./deleteButton";

const TableTransaction = ({ data, currentPage, setCurrentPage, handleInputChange, errorFilter, query, onTransactionCreate }) => { 
    const [transaction, setTransaction] = useState(data || []); 
    const [editingTransaction, setEditingTransaction] = useState(null);
    const itemsPerPage = 4;
    const [loading, setLoading] = useState(true); 
    const textColor = '#1F1717'
    useEffect(() => {
        setLoading(true); // Inicia o loading ao receber novos dados
        setTransaction(data)
        setLoading(false); // Finaliza o loading
    }, [data]);

    const indexOfLastTransaction = currentPage * itemsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
    const currentTransactions = transaction && transaction.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const totalPages = Math.ceil(transaction.length / itemsPerPage);

    const typeColors = {
        'income': '#5AED83',
        'expense': '#F87C7C',
    };

    const formatDate = (isoDate) => {
        return moment.utc(isoDate).format('DD/MM/YYYY');  // Usar moment.utc() para evitar conversão de fuso horário
    };

    const handleEditButtonClick = (transactionId) => {
        console.log(`fui clicado`)
        setEditingTransaction(transactionId); // Define a transação em edição
    };



    if (!transaction || transaction.length === 0) {
        // Exibe a mensagem de erro apenas se não houver transações e não houver erro no filtro
        if (!errorFilter ) {
            return (
                <> 
                <Box 
                    display="flex" 
                    flexDirection="column" 
                    alignItems="center" 
                    justifyContent="center" 
                    mt="40px" 
                    fontSize="30px"
                    objectFit="fill"
                    mx="auto" 
                > 
                    <Box color="#F87C7C"> 
                        No transactions available. 
                    </Box>
                    <Box mt="10px">
                        <CircularProgress 
                            isIndeterminate 
                            color='green.300' 
                            size="50px" 
                        />
                    </Box>
                </Box>
                </>
            );
        }
    }

    return (
        <> 
        {loading ? ( // Exibe loading enquanto estiver carregando
            <Box display="flex" justifyContent="center" mt="40px">
                <CircularProgress isIndeterminate color='green.300' size="50px" />
            </Box>
        ) : (
        <Card bg="#D3D3D3" maxWidth="1095px" mx="auto" p="4" borderRadius="20px">
            <Box mb="4">
                <SearchBar onSearch={handleInputChange} query={query}/>
                {errorFilter && <Box color="red" mt="2" set>{errorFilter}</Box>} 
            </Box>
            <TableContainer color={textColor} width="1040px" mx="auto">
                <Table variant='simple' width="100%">
                    <Thead>
                        <Tr borderBottom="3px solid #A4A4A4" borderTop="3px solid #A4A4A4" alignItems="center" justifyContent="center" >
                            <Td p="0" max-width="155px" height="40px">
                                <Box display="flex" alignItems="center" justifyContent="center" borderRight="2px solid #A4A4A4"  >
                                    Tipo
                                </Box>
                            </Td>
                            <Td p="0" max-width="126px" height="40px" >
                                <Box display="flex" alignItems="center" justifyContent="center" borderRight="2px solid #A4A4A4" >
                                    Valor
                                </Box>
                            </Td>
                            <Td p="0" max-width="145px" height="40px" >
                                <Box display="flex" alignItems="center" justifyContent="center" borderRight="2px solid #A4A4A4" >
                                    Categoria
                                </Box>
                            </Td>
                            <Td p="0" max-width="172px" height="40px" >
                                <Box display="flex" alignItems="center" justifyContent="center" borderRight="2px solid #A4A4A4" >
                                    Data
                                </Box>
                            </Td>
                            <Td p="0" max-width="320px" height="40px">
                                <Box display="flex" alignItems="center" justifyContent="center" >
                                    Descrição 
                                </Box>
                            </Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentTransactions.map((transaction, index) => (
                            <Tr key={transaction._id} borderBottom="3px solid #A4A4A4" >
                                <Td p="5px" width="155px" height="40px" >
                                    <Box display="flex" alignItems="center" justifyContent="center" > 
                                    <Button color={textColor} width="150px" bg={typeColors[transaction.type]}>
                                        {transaction.type === "income" ? "Ganhos" : "Gastos"}
                                    </Button>
                                    </Box>
                                </Td>
                                <Td p="0" width="126px" height="40px">
                                    <Box display="flex" alignItems="center" justifyContent="center"> 
                                        R$ {transaction.amount.toLocaleString('pt-BR')}
                                    </Box>
                                </Td>
                                <Td p="0" width="145px" height="40px" >
                                <CategoryLogic transaction={transaction} />
                                </Td>
                                <Td p="0" width="172px" height="40px">
                                    <Box display="flex" alignItems="center" justifyContent="center"> 
                                    <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '8px' }} />
                                    {formatDate(transaction.date)}
                                    </Box>
                                </Td>
                                <Td p="0" maxWidth="320px" minHeight="40px" >
                                    <Box className="soLongText">
                                        {transaction.description}
                                    </Box>
                                </Td>
                                <Td p="0" maxWidth="80px" className="table-cell" >
                                    <Box display="flex" height="auto" justifyContent="flex-end" flexDirection="row" alignItems="center">
                                        <EditButton transactionId={transaction._id} onTransactionCreate={onTransactionCreate} />
                                        <DeleteButton transactionId={transaction._id} onTransactionCreate={onTransactionCreate}/>    
                                    </Box> 
                                </Td>
                            </Tr> 
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt="2" p="0">
                <Button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    isDisabled={currentPage === 1}
                    aria-label="Previous Page"
                    variant="outline"
                    borderColor="#A4A4A4"
                    borderRadius="md"
                    px="4"
                    mr="2"
                    
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </Button>
                <Box color={textColor}>
                    Page {currentPage} of {totalPages}
                </Box>
                <Button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                    aria-label="Next Page"
                    variant="outline"
                    borderColor="#A4A4A4"
                    borderRadius="md"
                    px="4"
                    ml="2"
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </Button>
            </Box>
        </Card>
        )}
        </>
    )
}

export default TableTransaction;
