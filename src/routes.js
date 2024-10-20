import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionsScreen from "./screens/transactions";
import LoginScreen from "./screens/home/auth/login";
import RegisterScreen from "./screens/home/auth/register";
import PrivateRouter from "./components/auth/private_router";
import UsersEditScreen from "./screens/user_edit";

const Router = () => {
    return (
        <BrowserRouter> 
            <Routes>
                <Route path='/' element={<PrivateRouter element={TransactionsScreen}/>}/>
                <Route path='/edit' element={<PrivateRouter element={UsersEditScreen}/>}/>
                <Route path='/login' element={<LoginScreen/>}/>
                <Route path='/register' element={< RegisterScreen/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export  default Router 