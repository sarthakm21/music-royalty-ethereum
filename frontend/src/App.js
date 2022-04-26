import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import RegisterMusic from "./RegisterMusic";
import BuyMusic from "./BuyMusic";
import Navbar from "./Navbar";
import Home from "./Home";
import ClaimRoyalties from "./ClaimRoyalties";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<RegisterMusic />} />
          <Route path="buy" element={<BuyMusic />} />
          <Route path="claim" element={<ClaimRoyalties />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
