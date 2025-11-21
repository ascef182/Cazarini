import { useLanguage } from "../context/LanguageContext"
import { ArrowRight, Globe2, ShieldCheck, TrendingUp, Target, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackButton } from "./BackButton"
import { SEO } from "./SEO"
import { Footer } from "./Footer"

export const WhoWeAre = () => {
  const { isPortuguese } = useLanguage()
  const lang = isPortuguese ? "pt" : "en"

  const content = {
    hero: {
      en: {
        title: "WHO WE ARE",
      },
      pt: {
        title: "QUEM SOMOS",
      },
    },
    about: {
      en: {
        title: "Since 2009",
        heading: "Connecting the coffee world.",
        p1: "Cazarini Trading Company is an organization built from the ground up, now recognized across all continents for its excellence in coffee trading.",
        p2: "With over two decades of experience, we excel in risk management, international sales, and domestic procurement. Our approach maintains a meticulous focus on every detail until contract fulfillment—always minimizing risk and proactively addressing any challenges that may arise.",
      },
      pt: {
        title: "Desde 2009",
        heading: "Conectando o mundo do café.",
        p1: "A Cazarini Trading Company é uma organização construída do zero, agora reconhecida em todos os continentes por sua excelência no comércio de café.",
        p2: "Com mais de duas décadas de experiência, destacamo-nos na gestão de riscos, vendas internacionais e aquisições domésticas. Nossa abordagem mantém um foco meticuloso em cada detalhe até o cumprimento do contrato—sempre minimizando riscos e abordando proativamente quaisquer desafios.",
      },
    },
    missionVision: {
      en: {
        mission: {
          title: "Our Mission",
          desc: "To provide the best service and be the global reference in coffee trading, helping high-quality beans travel from farm to roastery with efficiency and integrity.",
        },
        vision: {
          title: "Our Vision",
          desc: "To minimize risk and maximize value for our partners through meticulous attention to detail, maintaining excellence in every step of the logistics process.",
        },
      },
      pt: {
        mission: {
          title: "Nossa Missão",
          desc: "Prestar o melhor serviço e ser referência global no comércio de café, ajudando grãos de alta qualidade a viajarem da fazenda à torrefação com eficiência e integridade.",
        },
        vision: {
          title: "Nossa Visão",
          desc: "Minimizar riscos e maximizar valor para nossos parceiros através de atenção meticulosa aos detalhes, mantendo a excelência em cada etapa do processo logístico.",
        },
      },
    },
    leadership: {
      en: {
        title: "LEADERSHIP",
        name: "Thiago Cazarini",
        role: "Founder & Head Coffee Trader",
        quote:
          "With over 21 years of experience, I leverage language skills and deep industry knowledge to strengthen communication networks and strategic partnerships across the coffee industry.",
        items: [
          {
            title: "Market Development",
            desc: "Developing new international markets and cultivating long-term client relationships.",
            icon: TrendingUp,
          },
          {
            title: "Multilingual Communication",
            desc: "Fluent in English, Spanish, and Italian to ensure seamless global operations.",
            icon: Globe2,
          },
          {
            title: "Comprehensive Expertise",
            desc: "Spanning commodity trading, logistics, risk assessment, and quality control.",
            icon: ShieldCheck,
          },
        ],
      },
      pt: {
        title: "LIDERANÇA",
        name: "Thiago Cazarini",
        role: "Fundador & Head Coffee Trader",
        quote:
          "Com mais de 21 anos de experiência, aproveito habilidades linguísticas e profundo conhecimento da indústria para fortalecer redes de comunicação e parcerias estratégicas.",
        items: [
          {
            title: "Desenvolvimento de Mercado",
            desc: "Desenvolvendo novos mercados internacionais e cultivando relacionamentos de longo prazo.",
            icon: TrendingUp,
          },
          {
            title: "Comunicação Multilíngue",
            desc: "Fluente em Inglês, Espanhol e Italiano para garantir operações globais contínuas.",
            icon: Globe2,
          },
          {
            title: "Expertise Abrangente",
            desc: "Abrangendo comércio de commodities, logística, avaliação de riscos e controle de qualidade.",
            icon: ShieldCheck,
          },
        ],
      },
    },
    cta: {
      en: {
        title: "Ready to elevate your coffee trade?",
        subtitle: "Join the network of global partners trusting Cazarini for excellence in every bag.",
        button: "Schedule a Call",
      },
      pt: {
        title: "Pronto para elevar seu comércio de café?",
        subtitle: "Junte-se à rede de parceiros globais que confiam na Cazarini para excelência em cada saca.",
        button: "Agendar uma Chamada",
      },
    },
  }

  return (
    <>
      <SEO
        title={
          lang === "en"
            ? "Who We Are - Cazarini Coffee Trading"
            : "Quem Somos - Cazarini Trading de Café"
        }
        description={
          lang === "en"
            ? "Learn about Cazarini Trading Company - connecting coffee producers to global markets since 2009. Our mission, vision, and commitment to quality coffee trading."
            : "Conheça a Cazarini Trading Company - conectando produtores de café aos mercados globais desde 2009. Nossa missão, visão e compromisso com o trading de café de qualidade."
        }
        keywords={
          lang === "en"
            ? "coffee broker, coffee trading company, brazilian coffee, Thiago Cazarini, coffee brokerage"
            : "corretor café, empresa trading café, café brasileiro, Thiago Cazarini, corretagem café"
        }
      />

      <div className="flex flex-col min-h-screen bg-white text-brand-900 font-sans selection:bg-accent-green selection:text-brand-900 overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-[12vw] leading-[0.8] font-bold tracking-tighter mb-8 uppercase">
              {lang === "en" ? (
                <>
                  WHO <br />
                  WE <br />
                  <span className="text-accent-green">ARE</span>
                </>
              ) : (
                <>
                  QUEM <br />
                  <span className="text-accent-green">SOMOS</span>
                </>
              )}
            </h1>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 md:px-8 bg-brand-950 text-white rounded-t-[3rem] md:rounded-t-[5rem]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  {content.about[lang].title}, <span className="text-accent-green">{content.about[lang].heading}</span>
                </h2>
              </div>
              <div className="space-y-6 text-lg md:text-xl text-neutral-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                <p>{content.about[lang].p1}</p>
                <p>{content.about[lang].p2}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="bg-neutral-50 p-10 rounded-3xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              <div className="w-12 h-12 bg-accent-green rounded-full flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-brand-900" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-brand-900">{content.missionVision[lang].mission.title}</h3>
              <p className="text-xl text-neutral-600 leading-relaxed">{content.missionVision[lang].mission.desc}</p>
            </div>

            {/* Vision Card */}
            <div className="bg-brand-950 text-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 text-accent-green">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold mb-4">{content.missionVision[lang].vision.title}</h3>
              <p className="text-xl text-neutral-300 leading-relaxed">{content.missionVision[lang].vision.desc}</p>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-20 px-4 md:px-8 bg-neutral-100 rounded-[3rem]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                <div className="aspect-[3/4] rounded-[2rem] overflow-hidden relative shadow-2xl group">
                  <img
                    src="/photos/thiago-cafe.jpg"
                    alt="Thiago Cazarini"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-3xl font-bold">{content.leadership[lang].name}</h3>
                    <p className="text-accent-green font-medium text-lg">{content.leadership[lang].role}</p>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-600">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-brand-900">{content.leadership[lang].title}</h2>
                  <p className="text-lg text-neutral-600 leading-relaxed italic border-l-4 border-accent-green pl-6">
                    "{content.leadership[lang].quote}"
                  </p>
                </div>

                <div className="space-y-6">
                  {content.leadership[lang].items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start group">
                      <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center shrink-0 group-hover:border-accent-green transition-colors">
                        <item.icon className="w-5 h-5 text-brand-900 group-hover:text-accent-green transition-colors" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-1 text-brand-900 group-hover:text-accent-green transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-neutral-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto animate-in zoom-in duration-700 delay-700">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-brand-900">{content.cta[lang].title}</h2>
            <p className="text-xl text-neutral-600 mb-10">{content.cta[lang].subtitle}</p>
            <a href="/#contato">
              <Button className="bg-brand-900 text-white px-8 py-6 rounded-full text-lg font-medium hover:bg-accent-green hover:text-brand-900 transition-all duration-300">
                {content.cta[lang].button}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
