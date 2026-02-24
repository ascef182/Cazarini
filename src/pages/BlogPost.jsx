import React, { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts } from "../data/blogPosts";
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Linkedin, Twitter, Facebook, Share2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { isPortuguese } = useLanguage();
    const lang = isPortuguese ? "pt" : "en";
    const pageRef = useRef(null);

    const post = blogPosts.find(p => p.slug === slug);

    useEffect(() => {
        if (!post) navigate("/blog");
    }, [post, navigate]);

    if (!post) return null;

    // Estimate reading time
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    // Get related articles (same category or random, excluding current)
    const relatedPosts = blogPosts
        .filter(p => p.id !== post.id)
        .sort((a, b) => (a.category === post.category ? -1 : 1))
        .slice(0, 3);

    // Get previous and next posts
    const currentIndex = blogPosts.findIndex(p => p.id === post.id);
    const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

    useEffect(() => {
        window.scrollTo(0, 0);

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
            gsap.fromTo('[data-animate="hero-meta"]',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, delay: 0.5 }
            );

            // Article content fade-in
            gsap.fromTo('[data-animate="article-content"]',
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
            );

            // Related articles stagger
            gsap.fromTo('[data-animate="related-card"]',
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.12,
                    scrollTrigger: { trigger: ".related-grid", start: "top 85%" }
                }
            );

            // CTA
            gsap.fromTo('[data-animate="cta"]',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8,
                    scrollTrigger: { trigger: '[data-animate="cta"]', start: "top 85%" }
                }
            );
        }, pageRef);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, [slug]);

    // Split content into paragraphs, filtering empty ones
    const paragraphs = post.content.split('\n').map(p => p.trim()).filter(p => p.length > 0);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>
            <SEO
                title={`${post.title} - Cazarini Coffee`}
                description={post.preview}
                image={post.image}
            />

            <div ref={pageRef} className="bg-white min-h-screen">
                {/* ═══════════════════════════════════════════════════════════════════
                    HERO - Dark cinematic with post image
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="relative min-h-[50vh] lg:min-h-[55vh] flex flex-col overflow-hidden">
                    {/* Background Image */}
                    <img
                        src={post.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/80 to-brand-950/50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-950/60 to-transparent" />

                    <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col flex-1 px-4 pt-10 sm:px-6 lg:px-10">
                        <Header variant="dark" />

                        <div className="flex flex-1 items-end pb-16 lg:pb-24 pt-20">
                            <div className="max-w-4xl space-y-6">
                                {/* Back + Category */}
                                <div data-animate="hero-eyebrow" className="flex items-center gap-4 flex-wrap">
                                    <Link
                                        to="/blog"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-accent-green transition-colors group"
                                    >
                                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                        {lang === "en" ? "Back to Blog" : "Voltar ao Blog"}
                                    </Link>
                                    <span className="w-px h-4 bg-white/20" />
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-green/20 border border-accent-green/30 text-xs font-bold text-accent-green uppercase tracking-wider">
                                        {post.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h1
                                    data-animate="hero-title"
                                    className="text-4xl font-editorial italic leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl xl:text-7xl"
                                >
                                    {post.title}
                                </h1>

                                {/* Meta info */}
                                <div data-animate="hero-meta" className="flex items-center gap-6 flex-wrap pt-2">
                                    <div className="flex items-center gap-3">
                                        <div className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-white/20">
                                            <img
                                                src="/photos/thiago-conteiner.jfif"
                                                alt={post.author}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{post.author}</p>
                                            <p className="text-xs text-white/50">CEO & Founder</p>
                                        </div>
                                    </div>

                                    <span className="w-px h-6 bg-white/10 hidden sm:block" />

                                    <div className="flex items-center gap-5 text-sm text-white/50">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {post.date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5" />
                                            {readingTime} min read
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    ARTICLE CONTENT
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="py-16 lg:py-24 bg-white">
                    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
                        <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
                            {/* Main Content */}
                            <article data-animate="article-content" className="max-w-3xl">
                                {/* Content paragraphs */}
                                <div className="space-y-6">
                                    {paragraphs.map((paragraph, idx) => (
                                        <p
                                            key={idx}
                                            className={`text-[17px] leading-[1.85] text-gray-600 ${
                                                idx === 0 ? "first-letter:text-5xl first-letter:font-editorial first-letter:text-brand-900 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none" : ""
                                            }`}
                                        >
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                {/* Tags */}
                                <div className="mt-16 pt-8 border-t border-gray-100">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                                        {lang === "en" ? "Related Topics" : "Tópicos Relacionados"}
                                    </h4>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-accent-green/10 hover:text-brand-900 transition-colors cursor-pointer font-medium">
                                            {post.category}
                                        </span>
                                        <span className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-accent-green/10 hover:text-brand-900 transition-colors cursor-pointer font-medium">
                                            Coffee Trade
                                        </span>
                                        <span className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-accent-green/10 hover:text-brand-900 transition-colors cursor-pointer font-medium">
                                            Brazil
                                        </span>
                                        <span className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600 hover:bg-accent-green/10 hover:text-brand-900 transition-colors cursor-pointer font-medium">
                                            Market Analysis
                                        </span>
                                    </div>
                                </div>

                                {/* Prev/Next Navigation */}
                                <div className="mt-12 grid sm:grid-cols-2 gap-4">
                                    {prevPost ? (
                                        <Link
                                            to={`/blog/${prevPost.slug}`}
                                            className="group flex flex-col p-6 rounded-2xl border border-gray-100 hover:border-accent-green/30 hover:shadow-lg transition-all"
                                        >
                                            <span className="text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                                                <ArrowLeft className="w-3 h-3" />
                                                {lang === "en" ? "Previous" : "Anterior"}
                                            </span>
                                            <span className="text-sm font-bold text-brand-900 group-hover:text-accent-green transition-colors line-clamp-2">
                                                {prevPost.title}
                                            </span>
                                        </Link>
                                    ) : <div />}
                                    {nextPost && (
                                        <Link
                                            to={`/blog/${nextPost.slug}`}
                                            className="group flex flex-col p-6 rounded-2xl border border-gray-100 hover:border-accent-green/30 hover:shadow-lg transition-all text-right"
                                        >
                                            <span className="text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1 justify-end">
                                                {lang === "en" ? "Next" : "Próximo"}
                                                <ArrowRight className="w-3 h-3" />
                                            </span>
                                            <span className="text-sm font-bold text-brand-900 group-hover:text-accent-green transition-colors line-clamp-2">
                                                {nextPost.title}
                                            </span>
                                        </Link>
                                    )}
                                </div>
                            </article>

                            {/* Sidebar */}
                            <aside className="hidden lg:block sticky top-8 space-y-8">
                                {/* Author Card */}
                                <div className="rounded-[24px] border border-gray-100 p-6 bg-white shadow-sm">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-14 w-14 rounded-2xl overflow-hidden">
                                            <img
                                                src="/photos/thiago-conteiner.jfif"
                                                alt={post.author}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-900">{post.author}</p>
                                            <p className="text-xs text-gray-500">CEO & Founder</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                        {lang === "en"
                                            ? "Coffee trader with 15+ years of experience in the Brazilian coffee market, connecting top producers with global buyers."
                                            : "Trader de café com 15+ anos de experiência no mercado de café brasileiro, conectando produtores de ponta com compradores globais."}
                                    </p>
                                </div>

                                {/* Share */}
                                <div className="rounded-[24px] border border-gray-100 p-6 bg-white shadow-sm">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
                                        <Share2 className="w-3.5 h-3.5" />
                                        {lang === "en" ? "Share Article" : "Compartilhar"}
                                    </h4>
                                    <div className="flex gap-3">
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-50 text-gray-500 hover:bg-[#0077b5] hover:text-white transition-all"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-50 text-gray-500 hover:bg-[#1DA1F2] hover:text-white transition-all"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </a>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center w-11 h-11 rounded-xl bg-gray-50 text-gray-500 hover:bg-[#4267B2] hover:text-white transition-all"
                                        >
                                            <Facebook className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="rounded-[24px] bg-brand-950 p-6 text-white">
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-accent-green mb-4">
                                        {lang === "en" ? "Quick Facts" : "Dados Rápidos"}
                                    </h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                                            <span className="text-sm text-white/50">{lang === "en" ? "Category" : "Categoria"}</span>
                                            <span className="text-sm font-semibold">{post.category}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                                            <span className="text-sm text-white/50">{lang === "en" ? "Published" : "Publicado"}</span>
                                            <span className="text-sm font-semibold">{post.date}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-sm text-white/50">{lang === "en" ? "Read Time" : "Leitura"}</span>
                                            <span className="text-sm font-semibold">{readingTime} min</span>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    RELATED ARTICLES
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="py-20 lg:py-28 bg-gray-50">
                    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
                        <div className="text-center mb-14">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-green mb-3">
                                {lang === "en" ? "KEEP READING" : "CONTINUE LENDO"}
                            </p>
                            <h2 className="text-3xl font-editorial italic leading-tight text-brand-900 sm:text-4xl">
                                {lang === "en" ? "Related Articles" : "Artigos Relacionados"}
                            </h2>
                        </div>

                        <div className="related-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {relatedPosts.map((rPost) => (
                                <Link
                                    to={`/blog/${rPost.slug}`}
                                    key={rPost.id}
                                    data-animate="related-card"
                                    className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
                                >
                                    <div className="h-56 overflow-hidden relative shrink-0">
                                        <img
                                            src={rPost.image}
                                            alt={rPost.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-900 shadow-sm">
                                            {rPost.category}
                                        </div>
                                    </div>
                                    <div className="p-7 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 font-medium">
                                            <span>{rPost.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                                            <span>{rPost.author}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-brand-900 mb-3 leading-tight group-hover:text-accent-green transition-colors flex-1">
                                            {rPost.title}
                                        </h3>
                                        <span className="text-brand-900 font-bold text-xs uppercase tracking-widest border-b border-brand-900/20 pb-1 self-start group-hover:border-accent-green transition-all">
                                            {lang === "en" ? "Read Article" : "Ler Artigo"}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    CTA SECTION
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="py-20 lg:py-28 bg-brand-950">
                    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
                        <div
                            data-animate="cta"
                            className="relative rounded-[32px] bg-accent-green px-8 py-20 lg:px-16 lg:py-24 text-center overflow-hidden"
                        >
                            <div className="absolute right-0 top-0 w-1/3 h-full bg-black/5 -skew-x-12 translate-x-1/4 rounded-[32px]" />

                            <div className="relative z-10">
                                <h2 className="text-3xl font-editorial italic leading-tight text-brand-900 sm:text-4xl lg:text-5xl mb-6">
                                    {lang === "en" ? "Ready to Partner?" : "Pronto para Parceria?"}
                                </h2>
                                <p className="text-xl text-brand-900/60 max-w-2xl mx-auto mb-10">
                                    {lang === "en"
                                        ? "Get direct access to premium Brazilian coffee. Contact our team for pricing, samples, and availability."
                                        : "Tenha acesso direto ao café premium brasileiro. Entre em contato para preços, amostras e disponibilidade."}
                                </p>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-3 rounded-2xl bg-brand-900 text-white px-12 py-5 font-bold uppercase tracking-widest text-sm hover:bg-brand-700 transition-colors"
                                >
                                    {lang === "en" ? "Contact Us" : "Fale Conosco"}
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export { BlogPost };
export default BlogPost;
