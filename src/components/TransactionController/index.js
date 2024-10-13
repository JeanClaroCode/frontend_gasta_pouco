import React, { useState, useEffect, useCallback } from "react";
import TransactionService from "../../services/transaction";
import usePagination from "./usePagination";


const TransactionController = ({ render }) => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("Transações mais recentes");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const [totalTransaction, setTotalTransaction] = useState([]);
  const [totalIncomeTransaction, setTotalIncomeTransaction] = useState([]);
  const [totalExpenseTransaction, setTotalExpenseTransaction] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [errorFilter, setErrorFilter] = useState(null);
  const year = 2024;

  const { currentPage, setPage, totalPages, paginatedItems } = usePagination(transactionsData);
console.log(query)
  useEffect(() => {
    setQuery(''); // Limpa a busca ao mudar de mês
}, [selectedMonth]); 
console.log(query)
  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      let responseTotal;
      let responseTotalIncome;
      let responseTotalExpense;
      
      if (selectedMonth === "Transações mais recentes") {
        response = await TransactionService.index();
        responseTotal = await TransactionService.totalTransactions();
        responseTotalIncome = await TransactionService.totalIncomeTransactions();
        responseTotalExpense = await TransactionService.totalExpenseTransactions();
      } else {
        const monthMap = {
          "Janeiro": 1, "Fevereiro": 2, "Março": 3, "Abril": 4, "Maio": 5,
          "Junho": 6, "Julho": 7, "Agosto": 8, "Setembro": 9, "Outubro": 10,
          "Novembro": 11, "Dezembro": 12
        };
        const monthIndex = monthMap[selectedMonth];
        response = await TransactionService.transactionsByMonthYear(year, monthIndex);
        responseTotal = await TransactionService.totalTransactionsByMonthYear(year, monthIndex);
        responseTotalIncome = await TransactionService.totalIncomeByMonthYear(year, monthIndex);
        responseTotalExpense = await TransactionService.totalExpenseByMonthYear(year, monthIndex);
      }
      console.log(`Fetching transactions for month: ${selectedMonth}`);
      console.log("API response:", response.data);
      setTransactionsData(response.data.reverse()); 
      setTotalTransaction(responseTotal.data);
      setTotalIncomeTransaction(responseTotalIncome.data);
      setTotalExpenseTransaction(responseTotalExpense.data);
    } catch (error) {
      setError("Erro ao buscar transações. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth]);

  const handleMonthChange = (newMonth) => {
    setSelectedMonth(newMonth);
    setPage(1); 
    setQuery("")
    setErrorFilter(null)
  };

  const handleTransactionCreate = () => {
    fetchTransactions();
  };

  const handleInputChange = (query) => { 
    setQuery(query)
  }

  const filterTransactions = (query) => {
    try {
      const lowerQuery = query.toLowerCase();  // Tornar a busca case-insensitive
      const filtered = transactionsData.filter((trans) =>
          trans.description.toLowerCase().includes(lowerQuery) || 
          trans.category.toLowerCase().includes(lowerQuery) || 
          trans.amount.toString().includes(lowerQuery)
      );
      setFilteredTransactions(filtered);  
      if (filtered.length === 0) {
        setErrorFilter("Nenhuma transação encontrada para o termo buscado.");
      } else {
        setErrorFilter(null);
      }
    } catch (error) {
      setErrorFilter("Erro ao filtrar transações. Tente novamente.");
    }
  };



useEffect(() => {
  if (query) {
      filterTransactions(query);  
      setPage(1)
  } else {
      setFilteredTransactions(transactionsData); 
  }
}, [query, transactionsData]);  

return render({
  transactionsData: query ? filteredTransactions : transactionsData,
  loading,
  error,
  currentPage,
  totalPages,
  changePage: setPage,
  handleMonthChange,
  handleTransactionCreate,
  totalTransaction,
  totalIncomeTransaction,
  totalExpenseTransaction,
  handleInputChange,
  errorFilter,
  query, 
});
};

export default TransactionController;