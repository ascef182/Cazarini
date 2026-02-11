import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { WhoWeAre } from "./components/who-we-are";
import Varieties from "./pages/Varieties";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

export const CoffeTrading = () => {
  return (
    <Router>
      <div data-color-mode="SDS-light" className="flex w-full flex-col bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/who-we-are" element={<WhoWeAre />} />
          <Route path="/quem-somos" element={<WhoWeAre />} />
          <Route path="/varieties" element={<Varieties />} />
          <Route path="/variedades" element={<Varieties />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default CoffeTrading;
