import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { BackButton } from "../components/BackButton";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";

export const WhoWeAre = () => {
  const { isPortuguese } = useLanguage();

  const content = {
    hero: {
      en: {
        title: "Who We Are",
        subtitle: "Connecting Coffee Producers to Global Markets Since 2009",
      },
      pt: {
        title: "Quem Somos",
        subtitle:
          "Conectando Produtores de Café aos Mercados Globais Desde 2009",
      },
    },
    mission: {
      en: {
        title: "Our Mission",
        text: "To provide exceptional coffee brokerage services that connect producers, exporters, and buyers worldwide, ensuring transparent pricing, quality assurance, and reliable market intelligence.",
      },
      pt: {
        title: "Nossa Missão",
        text: "Fornecer serviços excepcionais de corretagem de café que conectam produtores, exportadores e compradores em todo o mundo, garantindo preços transparentes, garantia de qualidade e inteligência de mercado confiável.",
      },
    },
    vision: {
      en: {
        title: "Our Vision",
        text: "To be the most trusted coffee brokerage firm globally, recognized for our expertise, integrity, and commitment to sustainable coffee trade.",
      },
      pt: {
        title: "Nossa Visão",
        text: "Ser a empresa de corretagem de café mais confiável globalmente, reconhecida por nossa expertise, integridade e compromisso com o comércio sustentável de café.",
      },
    },
    values: {
      en: {
        title: "Our Values",
        items: [
          {
            title: "Transparency",
            text: "We believe in open, honest communication and fair pricing for all parties.",
          },
          {
            title: "Quality",
            text: "We source and deliver only the finest coffee that meets international standards.",
          },
          {
            title: "Sustainability",
            text: "We promote responsible sourcing and environmental stewardship.",
          },
          {
            title: "Expertise",
            text: "Our team brings deep knowledge of the global coffee market.",
          },
        ],
      },
      pt: {
        title: "Nossos Valores",
        items: [
          {
            title: "Transparência",
            text: "Acreditamos em comunicação aberta, honesta e preços justos para todas as partes.",
          },
          {
            title: "Qualidade",
            text: "Fornecemos apenas o melhor café que atende aos padrões internacionais.",
          },
          {
            title: "Sustentabilidade",
            text: "Promovemos o fornecimento responsável e a gestão ambiental.",
          },
          {
            title: "Expertise",
            text: "Nossa equipe traz profundo conhecimento do mercado global de café.",
          },
        ],
      },
    },
    timeline: {
      en: {
        title: "Our Journey",
        events: [
          {
            year: "2009",
            title: "Company Founded",
            text: "Cazarini Trading Company was established in Varginha, MG, Brazil - the heart of Brazilian coffee production.",
          },
          {
            year: "2012",
            title: "International Expansion",
            text: "Began exporting premium Brazilian coffee to buyers in Europe and Asia.",
          },
          {
            year: "2015",
            title: "Certifications Achieved",
            text: "Obtained key sustainability certifications including RFA, 4C, and Fair Trade.",
          },
          {
            year: "2018",
            title: "Digital Transformation",
            text: "Launched weekly market reports and digital trading platform.",
          },
          {
            year: "2020",
            title: "Record Growth",
            text: "Surpassed 500 bags delivered and established partnerships with 100+ companies.",
          },
          {
            year: "2023",
            title: "EUDR Compliance",
            text: "Became fully compliant with EU Deforestation Regulation, leading the industry in sustainability.",
          },
          {
            year: "2025",
            title: "Continued Excellence",
            text: "Now serving 250+ companies worldwide with 920+ bags successfully delivered.",
          },
        ],
      },
      pt: {
        title: "Nossa Jornada",
        events: [
          {
            year: "2009",
            title: "Fundação da Empresa",
            text: "A Cazarini Trading Company foi estabelecida em Varginha, MG, Brasil - o coração da produção de café brasileiro.",
          },
          {
            year: "2012",
            title: "Expansão Internacional",
            text: "Começamos a exportar café brasileiro premium para compradores na Europa e Ásia.",
          },
          {
            year: "2015",
            title: "Certificações Conquistadas",
            text: "Obtivemos certificações-chave de sustentabilidade incluindo RFA, 4C e Fair Trade.",
          },
          {
            year: "2018",
            title: "Transformação Digital",
            text: "Lançamos relatórios semanais de mercado e plataforma digital de negociação.",
          },
          {
            year: "2020",
            title: "Crescimento Recorde",
            text: "Ultrapassamos 500 sacas entregues e estabelecemos parcerias com mais de 100 empresas.",
          },
          {
            year: "2023",
            title: "Conformidade EUDR",
            text: "Tornamo-nos totalmente compatíveis com o Regulamento de Desmatamento da UE, liderando a indústria em sustentabilidade.",
          },
          {
            year: "2025",
            title: "Excelência Contínua",
            text: "Agora atendendo mais de 250 empresas em todo o mundo com mais de 920 sacas entregues com sucesso.",
          },
        ],
      },
    },
    team: {
      en: {
        title: "Our Leadership",
        name: "Thiago Marques Cazarini",
        role: "Founder & CEO",
        bio: "With over 15 years of experience in the Brazilian coffee market, Thiago has built Cazarini Trading into one of the most trusted names in coffee brokerage. His weekly market reports are followed by hundreds of professionals worldwide, and his expertise in risk management and international trade has helped countless clients navigate the complexities of global coffee markets. Thiago's commitment to transparency, quality, and sustainable sourcing has made him a respected thought leader in the industry.",
      },
      pt: {
        title: "Nossa Liderança",
        name: "Thiago Marques Cazarini",
        role: "Fundador & CEO",
        bio: "Com mais de 15 anos de experiência no mercado de café brasileiro, Thiago construiu a Cazarini Trading como um dos nomes mais confiáveis em corretagem de café. Seus relatórios semanais de mercado são acompanhados por centenas de profissionais em todo o mundo, e sua expertise em gestão de riscos e comércio internacional ajudou inúmeros clientes a navegar pelas complexidades dos mercados globais de café. O compromisso de Thiago com transparência, qualidade e fornecimento sustentável o tornou um respeitado líder de pensamento na indústria.",
      },
    },
    cta: {
      en: {
        title: "Ready to Work Together?",
        subtitle: "Let's discuss how we can help your coffee business thrive",
        button: "Get in Touch",
      },
      pt: {
        title: "Pronto para Trabalhar Juntos?",
        subtitle:
          "Vamos discutir como podemos ajudar seu negócio de café a prosperar",
        button: "Entre em Contato",
      },
    },
  };

  const lang = isPortuguese ? "pt" : "en";

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

      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-16 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="mb-8">
              <BackButton />
            </div>
            <div className="text-center text-white">
              <h1 className="text-balance text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-5xl lg:text-[3.5rem]">
                {content.hero[lang].title}
              </h1>
              <p className="mt-6 text-xl text-white/80">
                {content.hero[lang].subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Mission */}
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-brand-900">
                  {content.mission[lang].title}
                </h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  {content.mission[lang].text}
                </p>
              </div>

              {/* Vision */}
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-brand-900">
                  {content.vision[lang].title}
                </h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  {content.vision[lang].text}
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="mt-20">
              <h2 className="mb-12 text-center text-3xl font-semibold text-brand-900">
                {content.values[lang].title}
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {content.values[lang].items.map((value, index) => (
                  <div
                    key={index}
                    className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <h3 className="mb-3 text-xl font-semibold text-brand-900">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {value.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <h2 className="mb-16 text-center text-3xl font-semibold text-brand-900">
              {content.timeline[lang].title}
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 h-full w-0.5 bg-accent-green lg:left-1/2" />

              {/* Timeline events */}
              <div className="space-y-12">
                {content.timeline[lang].events.map((event, index) => (
                  <div
                    key={index}
                    className={`relative flex gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Year badge */}
                    <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full bg-accent-green text-lg font-bold text-brand-900 shadow-lg lg:left-1/2 lg:-translate-x-1/2">
                      {event.year}
                    </div>

                    {/* Content */}
                    <div
                      className={`ml-24 flex-1 lg:ml-0 ${
                        index % 2 === 0 ? "lg:pr-24 lg:text-right" : "lg:pl-24"
                      }`}
                    >
                      <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-2 text-xl font-semibold text-brand-900">
                          {event.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-600">
                          {event.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team/Leadership */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <h2 className="mb-16 text-center text-3xl font-semibold text-brand-900">
              {content.team[lang].title}
            </h2>
            <div className="mx-auto max-w-4xl">
              <div className="overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-lg">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
                  {/* Photo */}
                  <div className="relative h-[400px] lg:h-auto">
                    <img
                      src="/photos/thiago-conteiner.jfif"
                      alt={content.team[lang].name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <h3 className="text-2xl font-semibold text-brand-900">
                      {content.team[lang].name}
                    </h3>
                    <p className="mt-2 text-lg text-accent-green">
                      {content.team[lang].role}
                    </p>
                    <p className="mt-6 leading-relaxed text-gray-600">
                      {content.team[lang].bio}
                    </p>
                    <div className="mt-6 flex gap-3">
                      <a
                        href="https://www.linkedin.com/in/thiago-marques-cazarini-903a96b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-brand-900 transition hover:border-brand-900 hover:bg-gray-50"
                        aria-label="LinkedIn"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 py-20 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-4 text-center sm:px-6 lg:px-10">
            <h2 className="text-balance text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
              {content.cta[lang].title}
            </h2>
            <p className="mt-4 text-lg text-white/80">
              {content.cta[lang].subtitle}
            </p>
            <div className="mt-8">
              <a
                href="/#contato"
                className="inline-flex items-center gap-3 rounded-pill bg-white px-8 py-3 text-sm font-semibold text-brand-900 transition hover:bg-gray-50"
              >
                {content.cta[lang].button}
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default WhoWeAre;
