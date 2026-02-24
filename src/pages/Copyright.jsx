import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  en: {
    title: "Copyright Notice",
    updated: "Last updated: February 2026",
    sections: [
      {
        heading: "1. Ownership",
        body: "All content published on cazarini.com — including but not limited to text, graphics, photographs, logos, market reports, data, and visual design — is the exclusive property of Cazarini Trading Company or its licensed content providers, and is protected under applicable copyright laws.",
      },
      {
        heading: "2. Permitted Use",
        body: "You may view and download content from this website for personal, non-commercial reference purposes only, provided that:\n\n• You do not modify or alter the content\n• You retain all copyright and attribution notices\n• You do not reproduce the content for commercial purposes without prior written consent",
      },
      {
        heading: "3. Prohibited Use",
        body: "Without express written permission from Cazarini Trading Company, you may not:\n\n• Reproduce, republish, or redistribute any content from this website\n• Use any content for commercial purposes\n• Scrape, frame, or mirror any portion of the website\n• Use market reports or data for publication in any media without attribution\n• Remove or alter any copyright, trademark, or other proprietary notices",
      },
      {
        heading: "4. Market Reports and Intelligence",
        body: "Cazarini Trading Company produces weekly market intelligence reports that are proprietary and confidential. These reports are shared exclusively with authorized business partners and subscribers. Reproduction, forwarding, or publication of these reports without written authorization is strictly prohibited.",
      },
      {
        heading: "5. Trademarks",
        body: "The Cazarini Trading Company name, logo, and related marks are trademarks of Cazarini Trading Company. They may not be used without prior written permission. All other trademarks appearing on this site belong to their respective owners.",
      },
      {
        heading: "6. Photography and Images",
        body: "All photographs and images displayed on this website are either owned by Cazarini Trading Company or licensed for use. Unauthorized reproduction or distribution of any image is prohibited.",
      },
      {
        heading: "7. Website Development",
        body: "This website was designed and developed by CazaTech (https://www.caza-tech.com). The website's code, architecture, and design system are the intellectual property of CazaTech. For web development inquiries, contact CazaTech directly.",
      },
      {
        heading: "8. Reporting Infringement",
        body: "If you believe that content on this website infringes your copyright or intellectual property rights, please contact us immediately:\n\nCazarini Trading Company\nEmail: trading@cazarini.com\nPhone: +55 35 8416-0810\nVarginha, Minas Gerais, Brazil",
      },
      {
        heading: "9. Disclaimer",
        body: "The information on this website is provided for general informational purposes. While we make every effort to keep information accurate and up to date, Cazarini Trading Company makes no warranties regarding the completeness or accuracy of any content. Market data and prices are indicative and subject to change without notice.",
      },
    ],
  },
  pt: {
    title: "Aviso de Direitos Autorais",
    updated: "Última atualização: Fevereiro de 2026",
    sections: [
      {
        heading: "1. Titularidade",
        body: "Todo o conteúdo publicado em cazarini.com — incluindo, mas não se limitando a textos, gráficos, fotografias, logotipos, relatórios de mercado, dados e design visual — é propriedade exclusiva da Cazarini Trading Company ou de seus fornecedores de conteúdo licenciados, e está protegido pelas leis de direitos autorais aplicáveis.",
      },
      {
        heading: "2. Uso Permitido",
        body: "Você pode visualizar e baixar conteúdo deste site apenas para fins de referência pessoal e não comercial, desde que:\n\n• Não modifique ou altere o conteúdo\n• Mantenha todos os avisos de direitos autorais e atribuição\n• Não reproduza o conteúdo para fins comerciais sem consentimento prévio por escrito",
      },
      {
        heading: "3. Uso Proibido",
        body: "Sem permissão expressa por escrito da Cazarini Trading Company, você não pode:\n\n• Reproduzir, republicar ou redistribuir qualquer conteúdo deste site\n• Usar qualquer conteúdo para fins comerciais\n• Fazer scraping, enquadrar ou espelhar qualquer parte do site\n• Usar relatórios de mercado ou dados para publicação em qualquer mídia sem atribuição\n• Remover ou alterar avisos de direitos autorais, marcas registradas ou outros avisos proprietários",
      },
      {
        heading: "4. Relatórios de Mercado e Inteligência",
        body: "A Cazarini Trading Company produz relatórios semanais de inteligência de mercado que são proprietários e confidenciais. Esses relatórios são compartilhados exclusivamente com parceiros comerciais autorizados e assinantes. A reprodução, encaminhamento ou publicação desses relatórios sem autorização por escrito é estritamente proibida.",
      },
      {
        heading: "5. Marcas Registradas",
        body: "O nome Cazarini Trading Company, logotipo e marcas relacionadas são marcas registradas da Cazarini Trading Company. Não podem ser usadas sem permissão prévia por escrito. Todas as outras marcas registradas que aparecem neste site pertencem aos seus respectivos proprietários.",
      },
      {
        heading: "6. Fotografias e Imagens",
        body: "Todas as fotografias e imagens exibidas neste site são de propriedade da Cazarini Trading Company ou licenciadas para uso. A reprodução ou distribuição não autorizada de qualquer imagem é proibida.",
      },
      {
        heading: "7. Desenvolvimento do Site",
        body: "Este site foi projetado e desenvolvido pela CazaTech (cazatech.com.br). O código, a arquitetura e o sistema de design do site são propriedade intelectual da CazaTech. Para consultas sobre desenvolvimento web, entre em contato diretamente com a CazaTech.",
      },
      {
        heading: "8. Reportar Violação",
        body: "Se você acredita que algum conteúdo neste site viola seus direitos autorais ou de propriedade intelectual, entre em contato conosco imediatamente:\n\nCazarini Trading Company\nE-mail: trading@cazarini.com\nTelefone: +55 35 8416-0810\nVarginha, Minas Gerais, Brasil",
      },
      {
        heading: "9. Isenção de Responsabilidade",
        body: "As informações neste site são fornecidas apenas para fins informativos gerais. Embora façamos todo o esforço para manter as informações precisas e atualizadas, a Cazarini Trading Company não oferece garantias quanto à integridade ou precisão de qualquer conteúdo. Dados de mercado e preços são indicativos e sujeitos a alterações sem aviso prévio.",
      },
    ],
  },
};

export const Copyright = () => {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const c = content[lang];

  return (
    <>
      <SEO
        title={
          lang === "en"
            ? "Copyright Notice - Cazarini Trading"
            : "Direitos Autorais - Cazarini Trading"
        }
        description={
          lang === "en"
            ? "Copyright Notice for Cazarini Trading Company. All rights reserved."
            : "Aviso de Direitos Autorais da Cazarini Trading Company. Todos os direitos reservados."
        }
        keywords={
          lang === "en"
            ? "copyright, intellectual property, Cazarini Trading"
            : "direitos autorais, propriedade intelectual, Cazarini Trading"
        }
      />

      <div className="flex flex-col min-h-screen bg-white font-sans">
        <div className="bg-brand-950">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-10">
            <Header variant="dark" />
          </div>
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-16">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent-green mb-4">
              Legal
            </p>
            <h1 className="text-4xl lg:text-5xl font-editorial italic text-white mb-3">
              {c.title}
            </h1>
            <p className="text-white/40 text-sm">{c.updated}</p>
          </div>
        </div>

        <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="space-y-10">
            {c.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-lg font-semibold text-brand-900 mb-3">
                  {section.heading}
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Copyright;
