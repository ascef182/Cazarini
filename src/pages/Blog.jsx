import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts } from "../data/blogPosts";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
    const { isPortuguese } = useLanguage();
    const lang = isPortuguese ? "pt" : "en";
    const containerRef = useRef(null);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

        const ctx = gsap.context(() => {
            // Hero animations
            gsap.fromTo('[data-animate="hero-eyebrow"]',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, delay: 0.2 }
            );
            gsap.fromTo('[data-animate="hero-title"]',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, delay: 0.3 }
            );
            gsap.fromTo('[data-animate="hero-subtitle"]',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, delay: 0.5 }
            );

            // Blog cards
            gsap.fromTo("[data-animate='blog-card']",
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
                    scrollTrigger: { trigger: ".blog-grid", start: "top 85%" }
                }
            );
        }, containerRef);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, [filter]);

    // Get unique categories
    const categories = ["All", ...new Set(blogPosts.map(post => post.category))];

    const filteredPosts = filter === "All"
        ? blogPosts
        : blogPosts.filter(post => post.category === filter);

    return (
        <>
            <SEO
                title={lang === "en" ? "Cazarini Coffee Blog | Market Insights & Trade News" : "Blog Cazarini Coffee | Insights de Mercado e Notícias"}
                description={lang === "en"
                    ? "Stay updated with the latest coffee market trends, harvest reports, and global trade analysis from Cazarini Trading."
                    : "Fique atualizado com as últimas tendências do mercado de café, relatórios de safra e análises de comércio global da Cazarini Trading."}
            />

            <div ref={containerRef} className="bg-gray-50 min-h-screen flex flex-col">
                {/* ═══════════════════════════════════════════════════════════════════
                    HERO - Dark cinematic, matching Logistics/Varieties
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="relative min-h-[50vh] flex flex-col overflow-hidden">
                    <img
                        src="/photos/materialdetrabalho.jpg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-25"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/50 to-brand-950" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-950/60 to-transparent" />

                    <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col flex-1 px-4 pt-10 sm:px-6 lg:px-10">
                        <Header variant="dark" />

                        <div className="flex flex-1 items-center justify-center text-center py-20">
                            <div className="max-w-3xl space-y-6">
                                <p
                                    data-animate="hero-eyebrow"
                                    className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-accent-green"
                                >
                                    {lang === "en" ? "OUR JOURNAL" : "NOSSO JORNAL"}
                                </p>
                                <h1
                                    data-animate="hero-title"
                                    className="text-5xl font-editorial italic leading-[1.1] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl"
                                >
                                    {lang === "en" ? "Market Insights" : "Insights de Mercado"}
                                </h1>
                                <p
                                    data-animate="hero-subtitle"
                                    className="mx-auto max-w-2xl text-lg leading-relaxed text-white/50"
                                >
                                    {lang === "en"
                                        ? "Expert analysis on the coffee industry, direct from the source."
                                        : "Análises de especialistas sobre a indústria do café, direto da fonte."}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    CATEGORY FILTERS
                ═══════════════════════════════════════════════════════════════════ */}
                <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFilter(cat)}
                                        className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                                            filter === cat
                                                ? "bg-accent-green text-brand-900 shadow-sm"
                                                : "bg-gray-100 text-gray-600 hover:border-brand-900 hover:text-brand-900"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">
                                {lang === "en" ? "Showing" : "Mostrando"}{" "}
                                <span className="text-brand-900 font-semibold">{filteredPosts.length}</span>{" "}
                                {lang === "en" ? "articles" : "artigos"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════════════
                    BLOG GRID
                ═══════════════════════════════════════════════════════════════════ */}
                <div className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 w-full">
                    {filteredPosts.length > 0 ? (
                        <div className="blog-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredPosts.map((post) => (
                                <Link
                                    to={`/blog/${post.slug}`}
                                    key={post.id}
                                    data-animate="blog-card"
                                    className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                                >
                                    <div className="h-60 overflow-hidden relative shrink-0">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-900 shadow-sm">
                                            {post.category}
                                        </div>
                                    </div>
                                    <div className="p-7 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
                                            <span>{post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                            <span>{post.author}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-brand-900 mb-3 leading-tight group-hover:text-accent-green transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-500 mb-6 line-clamp-3 text-sm leading-relaxed flex-1">
                                            {post.preview}
                                        </p>
                                        <span className="text-brand-900 font-bold text-xs uppercase tracking-widest border-b border-brand-900/20 pb-1 self-start group-hover:border-accent-green transition-all inline-flex items-center gap-2">
                                            {lang === "en" ? "Read Article" : "Ler Artigo"}
                                            <ArrowRight className="w-3 h-3" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">
                                {lang === "en" ? "No articles found in this category." : "Nenhum artigo encontrado nesta categoria."}
                            </p>
                            <button
                                onClick={() => setFilter("All")}
                                className="mt-4 text-brand-900 font-bold underline"
                            >
                                {lang === "en" ? "View all articles" : "Ver todos os artigos"}
                            </button>
                        </div>
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
};

export { Blog };
export default Blog;
