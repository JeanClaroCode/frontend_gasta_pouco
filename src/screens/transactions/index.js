import React from "react";
import Header from "../../components/header";
import CardsTotalTransactions from "../../components/totalTransactions";
import MonthYearDropDown from "../../components/MonthYearDropdown";
import { Box, Flex, CircularProgress, Text, Button } from "@chakra-ui/react";
import ButtonCreateTransaction from './../../components/createTransactionButton/index';
import TableTransaction from "../../components/TableTransactions";
import '../../styles/transactions.scss';
import TransactionController from "../../components/TransactionController";


const TransactionsScreen = () => {
    const textColor = '#1F1717';
    return (
        <TransactionController
            render={({ transactionsData, filteredTransactions, loading, error, currentPage, totalPages, changePage, handleMonthChange, handleTransactionCreate, totalTransaction, totalIncomeTransaction, totalExpenseTransaction, handleInputChange, errorFilter, query }) => (
                <>
                    <Header />
                    <Box>
                        <CardsTotalTransactions 
                        dataTotal={totalTransaction}
                        dataTotalIncome={totalIncomeTransaction}
                        dataTotalExpense={totalExpenseTransaction}
                        />
                    </Box>
                    <Flex align="center" maxWidth="1040px" mx="auto" flexDirection={{ base: "column", md: "row" }} justify="space-between">
                        <MonthYearDropDown onMonthChange={handleMonthChange} /> {/* Passa a função para mudar o mês */}
                        <ButtonCreateTransaction onTransactionCreate={handleTransactionCreate} /> {/* Atualiza as transações após criar */}
                    </Flex>
                    <Box mt="5px" align="center">
                            <TableTransaction
                            filteredData={filteredTransactions}
                            data={transactionsData}
                            currentPage={currentPage}
                            setCurrentPage={changePage}
                            handleInputChange={handleInputChange}
                            errorFilter={errorFilter}
                            query={query}
                            onTransactionCreate={handleTransactionCreate} 
                            />
                    </Box>
                </>
            )}
        />
    );
};

export default TransactionsScreen;
