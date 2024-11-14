import React from "react";
import Nav from "./components/Nav";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Votes from "./components/pages/Table";
import Statistics from "./components/pages/Controller";
import Layout from "./components/pages/Layout";
import { RootState, useAppSelector } from "./redux/store";




export default function App() {
  return (
    <div>
      <Nav />
      <Routes> 
         : "War - Simulator"
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="layout" element={<Layout />} />
        <Route path="/" element={<Navigate to={"/login"} />} />
      </Routes>
     
    </div>
  );
}
