import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { WhoWeAre } from "./components/who-we-are";
import Varieties from "./pages/Varieties";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";
import Logistics from "./pages/Logistics";
import Gallery from "./pages/Gallery";
import NotFound from "./pages/NotFound";

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
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/logistica" element={<Logistics />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default CoffeTrading;

