import React, { useRef, useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    category: "Market Update",
    date: "Jan 2025",
    title: "Brazil's 2025 Crop & Market Outlook",
    preview: "Selling activity improved... Arabica 20-30% left...",
    content: `Speaking to and visiting multiple cooperatives and private exporters/warehouses during last week in Cerrado and South Minas, I've heard selling activity improved a bit but not in an abysmal way.
    
    It's clear to them all that producers have more coffee to sell in comparison to last years at this time of the year. Expectations is that for Arabica there is still 20-30% left of crop 25/26. Whereas this % was due at the end of November in the last years.
    
    So the wait game puts them in a blurry risk reward position. Yes, destination stocks don't rise , while the coffee sits here. How long they can wait? A lot longer for sure, and even can stock for multiple crops a good part of production as some larger producers do.
    
    But the question is, will this strategy work like it did in the last 2 to 3 years? A simple provocative question. Differentials at levels never seen before. Off season won't change dramatically but new crop is each day closer and Brazil will always sell at some stage.`,
    author: "Thiago Cazarini",
    image: "/photos/thiago-cafe.jpg"
  },
  {
    id: 2,
    category: "Technology",
    date: "Jan 2025",
    title: "The Future of Grading: 3D Scanning Tech",
    preview: "Today we were presented the innovative grading machine...",
    content: `Today we were presented the innovative grading machine from @agrivero.ai. They have been working on it in the last 4 years.
    
    Their 3D beans scan, scanning ALL BEANS of the sample presented, offers no mistake for those wanting to level up blending, give producers a right grading sheet, settle disputes and even teach a team.
    
    There is a lot to discover and improve in our industry, in all levels. Whoever doesn't adapt and react, will perhaps not become obsolete but will lose importance, visibility and MONEY...`,
    author: "Thiago Cazarini",
    image: "/photos/experimento-cafe.jpg" // Placeholder
  },
  {
    id: 3,
    category: "Global Trade",
    date: "Dec 2024",
    title: "Global Consumption Insights: US, Japan, UK",
    preview: "Over the past two weeks, I visited the United States, Japan, and the United Kingdom...",
    content: `Over the past two weeks, I visited the United States, Japan, and the United Kingdom. MAXIMIZING PROFITABILITY WITH THE RIGHT COFFEE BROKERAGE PARTNER.
    
    The general narrative is consistent across regions: consumption has not shown a sharp decline, and some even suggest it may be slightly increasing on a global scale.
    
    Despite Brazil’s strong and surprisingly consistent export volumes over the past three months, pipeline inventories have not been significantly replenished. For many, the current market inversion poses a greater challenge than high interest rates or Brazil’s firm differentials, which are expected to ease with the full arrival of the 2025 crop — at least, that is the prevailing expectation, even if it proves to be a brief window.
    
    Trading houses are expecting to receive stocks in direct proportion to what their clients consume — not a grain more or less, and in many cases, even less than needed. Amid this tightness, we are relying on flawless logistics in Brazil, which we know is unlikely. Logistics may become even more strained with the harvest’s arrival.
    
    The rally in New York to 400 cts/lb was expected to translate into significantly higher prices for end-consumers. However, up until now, the actual impact has been lighter than anticipated. There is notable concern surrounding the Brazilian winter and the second half of the year — particularly regarding rainfall and temperatures — factors that will be closely and consistently monitored.
    
    Next year’s crop carries tremendous potential, and we cannot afford to miss it — assuming there is anything we can do to influence the outcome. The conviction remains that the market will continue to exhibit sharp upward movements and corrections, with a bias toward more frequent bullish moments than bearish ones.
    
    Nominal prices remain high, which has reduced the typical harvest-related selling pressure. Where a producer once needed to sell ten bags to cover costs, today, only three may suffice. This summarizes fifteen days in the field, gathering relevant insights to help us understand what may or may not lie ahead.`,
    author: "Thiago Cazarini",
    image: "/photos/thiago-conteiner.jfif"
  },
  {
    id: 4,
    category: "Economic Analysis",
    date: "Jan 2025",
    title: "January Export Pace & Exchange Rates",
    preview: "January pace of exports continue on the high side...",
    content: `Quick handbook note... January pace of exports continue on the high side.
    
    As pictured some weeks ago, the chase for the real crop number of last year would be defined together with the shipments performance of Q1 Q2 2025. If the pace remains above 3.5 per month, mathematically it's easy to pin a crop above 70mi bags in cycle 24/25 with our domestic market almost 22mi bags.
    
    Such scenario can also enlighten a global resilient demand since destination stocks aren't building and the use of certified stocks can pick up fastly with Brazil basis (diffs) very high even with KC prices above 360/370cts now.
    
    Brazil Central Bank just raised interest rates to 13.25% a year, up 1% making BRL to gain and hold value lately towards 5.80/5.70 (which remains to be seen if consolidates here or weakens in any political tension on government spending or tax reforms). A stronger BRL plays against cheaper diffs and usually not the case of influence to KC market as some would think, this correlation mainly matter when producers want to sell, which isn't the case in Brazil for an extended time already.
    
    Latest domestic market businesses have been as high as 2600 BRL for certified coffee (RFA) and 2550, both versus fancy qualities (fine cups).`,
    author: "Thiago Cazarini",
    image: "/photos/cafe-cazarini.jpg"
  },
  {
    id: 5,
    category: "Producer Insight",
    date: "Jan 2025",
    title: "When Do Producers Sell?",
    preview: "I was asked where Brazilian producers sell coffee again...",
    content: `I was asked where Brazilian producers sell coffee again, for the current crop, in decent volumes.
    
    Considering their mentality, firstly, they are more frequently sellers when they are facing bills to pay, like farm care (fertilizer, chemicals, pruning, etc), picking costs, or buying a new asset, be it another farm, land, machinery... For the moment they don't have a lot of cash outflow going on and harvest a few months away.
    
    Whoever has stocks now are medium/large producers. Within their expectations, crossing it vs overseas expectations too (basis, differentials), I'd say market needs to be at 400/410 to see a bigger flow of fine cups priced around -10 basis to end up rewarding them BRL2500.
    
    If we see it, it's another story. There are other coffees in between 340/400-410 NY levels that the market probably buys first, but ultimately it's a possibility Brazilian farmers could strike again a good deal by holding for 3 to 4 more months... but can also be a mistake. For now I simply don't see them under a price threat.
    
    However, new crop dynamics might change and fall into cheaper levels both flat and diffs.`,
    author: "Thiago Cazarini",
    image: "/photos/grade-cafe.jpg"
  },
  {
    id: 6,
    category: "Year in Review",
    date: "Dec 2024",
    title: "2024 Market Wrap Up",
    preview: "2025 ended with 40mi bags exported...",
    content: `2025 ended with 40mi bags exported. A retraction of almost 21%.
    
    USA leaded the drop with -34%. Germany won the podium during the year. Stocks in America must be the lowest ever registered. While other stocks pile up at origin BRAZIL.
    
    As usual, not a matter of NO COFFEE but rather WHERE they are sitting.`,
    author: "Thiago Cazarini",
    image: "/photos/cafes-cazarini.jpg"
  }
];

const Insights = () => {
    const { isPortuguese } = useLanguage();
    const lang = isPortuguese ? "pt" : "en";
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from("[data-animate='article-card']", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".articles-grid",
                    start: "top 80%"
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-gray-50 min-h-screen flex flex-col">
            <SEO 
                title={lang === "en" ? "Market Insights - Cazarini Coffee" : "Insights de Mercado - Cazarini Coffee"}
                description="Latest updates on global coffee trading, harvest news, and market analysis from Thiago Cazarini." 
            />
            <div className="bg-brand-950 pt-32 pb-20">
                <Header variant="dark" />
                <div className="max-w-[1440px] mx-auto px-6 lg:px-10 text-center">
                    <p className="text-accent-green uppercase tracking-widest text-sm font-bold mb-4">
                        {lang === "en" ? "KNOWLEDGE HUB" : "CENTRO DE CONHECIMENTO"}
                    </p>
                    <h1 className="text-5xl lg:text-7xl font-editorial italic text-white mb-6">
                        {lang === "en" ? "Market Insights" : "Insights de Mercado"}
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        {lang === "en" 
                            ? "Exclusive analysis, field reports, and strategic outlooks from our team." 
                            : "Análises exclusivas, relatórios de campo e perspectivas estratégicas da nossa equipe."}
                    </p>
                </div>
            </div>

            <div className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-10 py-20">
                <div className="articles-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <div key={article.id} data-animate="article-card" className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="h-64 overflow-hidden relative">
                                <img 
                                    src={article.image} 
                                    alt={article.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-brand-900">
                                    {article.category}
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                    <span>{article.date}</span>
                                    <span>•</span>
                                    <span>{article.author}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-brand-900 mb-4 leading-tight group-hover:text-accent-green transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-gray-500 mb-6 line-clamp-3 text-sm leading-relaxed">
                                    {article.content}
                                </p>
                                <button className="text-brand-900 font-bold text-sm uppercase tracking-wider border-b border-brand-900/20 pb-1 group-hover:border-accent-green transition-all">
                                    {lang === "en" ? "Read Analysis" : "Ler Análise"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export { Insights };
export default Insights;
