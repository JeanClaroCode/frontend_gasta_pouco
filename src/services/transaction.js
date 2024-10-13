import Api from "./api";

const TransactionService = {
    index: () => Api.get("/transactions", { 
        headers: {'x-access-token': localStorage.getItem("token")},
    }),
    create: (transactionData) => Api.post("/transactions", transactionData, {
        headers: { "x-access-token": localStorage.getItem("token") },
    }),
    getMoreRecent: () => Api.get("/", {
        headers: { "x-access-token": localStorage.getItem("token") },
    }),
    transactionsByMonthYear: (year, month) => Api.get(`/transactions/${year}/${month}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
    }),
    totalTransactions: () => Api.get("/transactions/total", {
        headers: { "x-access-token": localStorage.getItem("token") },
    }),
    totalIncomeTransactions: () => Api.get("/transactions/income/total", {
        headers: { "x-access-token": localStorage.getItem("token") },
    }),
    totalExpenseTransactions: () => Api.get("/transactions/expense/total", { 
        headers: { "x-access-token": localStorage.getItem("token") },
    }),
    totalTransactionsByMonthYear: (year, month) => Api.get(`/transactions/total/${year}/${month}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
    }),
    totalIncomeByMonthYear: (year, month) => Api.get(`transactions/income/total/${year}/${month}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
    }),
    totalExpenseByMonthYear: (year, month) => Api.get(`transactions/expense/total/${year}/${month}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
    }),
    Search: (query) => Api.get(`transactions/search?query=${query}`, {
        headers: {"x-access-token": localStorage.getItem("token")}
    }),
    GetTransaction: (id) => Api.get(`transactions/${id}`,{
        headers: {"x-access-token": localStorage.getItem("token")}
    }),
    Edit: (id, transactionData) => Api.put(`/transactions/${id}`,transactionData, {
        headers: { "x-access-token": localStorage.getItem("token") },
    })
}

export  default TransactionService