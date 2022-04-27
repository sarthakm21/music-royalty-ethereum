import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import RegisterMusic from "./RegisterMusic";
import BuyMusic from "./BuyMusic";
import Home from "./Home";
import ClaimRoyalties from "./ClaimRoyalties";
import Login from "./Login";
import YourSongs from "./YourSongs";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<RegisterMusic />} />
          <Route path="buy" element={<BuyMusic />} />
          <Route path="claim" element={<ClaimRoyalties />} />
          <Route path="songs" element={<YourSongs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
