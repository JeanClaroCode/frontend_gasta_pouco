import React from "react";
import Header from "../../components/header";
import CardsTotalTransactions from "../../components/totalTransactions";
import MonthYearDropDown from "../../components/MonthYearDropdown";
import { Box, Flex, CircularProgress, Text, Button } from "@chakra-ui/react";
import ButtonCreateTransaction from './../../components/createTransactionButton/index';
import TableTransaction from "../../components/TableTransactions";
import '../../styles/transactions.scss';
import TransactionController from "../../components/TransactionController";
import EditProfile from "../../components/userEditForm";


const UsersEditScreen = () => {
    return (
        <>
        <Header/>
            <Box 
                display="flex"
                alignItems="center"
                justifyContent="center"
                >
                <EditProfile/>
            </Box>
        </>
       
    );
};

export default UsersEditScreen;
