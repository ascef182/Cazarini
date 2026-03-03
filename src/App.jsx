import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const WhoWeAre = lazy(() =>
  import("./components/who-we-are").then((m) => ({ default: m.WhoWeAre }))
);
const Varieties = lazy(() => import("./pages/Varieties"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Insights = lazy(() => import("./pages/Insights"));
const Contact = lazy(() => import("./pages/Contact"));
const Logistics = lazy(() => import("./pages/Logistics"));
const Gallery = lazy(() => import("./pages/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const EmailPolicy = lazy(() => import("./pages/EmailPolicy"));
const Copyright = lazy(() => import("./pages/Copyright"));

export const CoffeTrading = () => {
  return (
    <Router>
      <div data-color-mode="SDS-light" className="flex w-full flex-col bg-white">
        <Suspense fallback={null}>
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
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
            <Route path="/email-policy" element={<EmailPolicy />} />
            <Route path="/politica-de-email" element={<EmailPolicy />} />
            <Route path="/copyright" element={<Copyright />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default CoffeTrading;
