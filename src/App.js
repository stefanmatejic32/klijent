import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import { AuthProvider } from "./Auth";
import "./styles.css";

const App = () => {
  return (
    <div>
      <AuthProvider >
        <BrowserRouter className="h-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
