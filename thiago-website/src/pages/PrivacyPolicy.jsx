import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated: February 2026",
    sections: [
      {
        heading: "1. Who We Are",
        body: "Cazarini Trading Company, headquartered in Varginha, Minas Gerais, Brazil, is a coffee trading company operating globally. This Privacy Policy explains how we collect, use, store, and protect your personal data when you interact with our website at cazarini.com or contact us directly.",
      },
      {
        heading: "2. Data We Collect",
        body: "We may collect the following personal data when you fill out our contact form or communicate with us:\n\n• Full name\n• Company or farm name\n• Email address\n• Phone number\n• Business type and trading volume\n• Coffee types and certifications\n• Messages and inquiries\n\nWe do not collect sensitive personal data (such as biometric or financial data) through this website.",
      },
      {
        heading: "3. How We Use Your Data",
        body: "Your personal data is used exclusively to:\n\n• Respond to your commercial inquiries\n• Assess potential business partnerships\n• Send relevant trading information you have requested\n• Comply with legal and contractual obligations\n\nWe do not sell, rent, or share your personal data with third parties for marketing purposes.",
      },
      {
        heading: "4. Legal Basis for Processing",
        body: "We process your data based on:\n\n• Your consent (by submitting our contact form)\n• Legitimate interest in conducting B2B commercial activities\n• Compliance with applicable law, including Brazil's LGPD (Lei Geral de Proteção de Dados, Law 13.709/2018) and the EU GDPR where applicable",
      },
      {
        heading: "5. Data Retention",
        body: "We retain your personal data for as long as necessary to maintain our business relationship or as required by law. Data from unanswered inquiries is deleted after 12 months. You may request deletion at any time.",
      },
      {
        heading: "6. Third-Party Services",
        body: "Our contact forms are processed through Formspree (formspree.io), a third-party form submission service. Formspree processes data in accordance with its own privacy policy. We recommend reviewing Formspree's privacy policy at formspree.io/legal/privacy-policy.",
      },
      {
        heading: "7. Your Rights",
        body: "Under the LGPD and GDPR, you have the right to:\n\n• Access the personal data we hold about you\n• Correct inaccurate or incomplete data\n• Request deletion of your data\n• Withdraw consent at any time\n• Request data portability\n• File a complaint with the relevant data protection authority (ANPD in Brazil)\n\nTo exercise any of these rights, contact us at: trading@cazarini.com",
      },
      {
        heading: "8. Cookies",
        body: "This website may use essential cookies to ensure proper functionality. We do not use advertising or tracking cookies. You can disable cookies in your browser settings at any time without affecting your ability to access the site.",
      },
      {
        heading: "9. Security",
        body: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no transmission over the internet is 100% secure.",
      },
      {
        heading: "10. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. The most current version will always be available on this page with the date of the last update.",
      },
      {
        heading: "11. Contact",
        body: "For any questions or requests regarding this Privacy Policy, contact us:\n\nCazarini Trading Company\nVarginha, Minas Gerais, Brazil\nEmail: trading@cazarini.com\nPhone: +55 35 8416-0810",
      },
    ],
  },
  pt: {
    title: "Política de Privacidade",
    updated: "Última atualização: Fevereiro de 2026",
    sections: [
      {
        heading: "1. Quem Somos",
        body: "A Cazarini Trading Company, com sede em Varginha, Minas Gerais, Brasil, é uma empresa de comércio de café com atuação global. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos seus dados pessoais quando você interage com nosso site cazarini.com ou nos contata diretamente.",
      },
      {
        heading: "2. Dados que Coletamos",
        body: "Podemos coletar os seguintes dados pessoais quando você preenche nosso formulário de contato ou se comunica conosco:\n\n• Nome completo\n• Nome da empresa ou fazenda\n• Endereço de e-mail\n• Número de telefone\n• Tipo de negócio e volume de negociação\n• Tipos de café e certificações\n• Mensagens e consultas\n\nNão coletamos dados pessoais sensíveis (como dados biométricos ou financeiros) por meio deste site.",
      },
      {
        heading: "3. Como Usamos Seus Dados",
        body: "Seus dados pessoais são utilizados exclusivamente para:\n\n• Responder às suas consultas comerciais\n• Avaliar potenciais parcerias de negócios\n• Enviar informações de trading relevantes que você solicitou\n• Cumprir obrigações legais e contratuais\n\nNão vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.",
      },
      {
        heading: "4. Base Legal para o Tratamento",
        body: "Tratamos seus dados com base em:\n\n• Seu consentimento (ao enviar nosso formulário de contato)\n• Interesse legítimo na condução de atividades comerciais B2B\n• Cumprimento da legislação aplicável, incluindo a LGPD (Lei Geral de Proteção de Dados, Lei 13.709/2018) e o GDPR da UE, quando aplicável",
      },
      {
        heading: "5. Retenção de Dados",
        body: "Mantemos seus dados pessoais pelo tempo necessário para manter nosso relacionamento comercial ou conforme exigido por lei. Dados de consultas não respondidas são excluídos após 12 meses. Você pode solicitar a exclusão a qualquer momento.",
      },
      {
        heading: "6. Serviços de Terceiros",
        body: "Nossos formulários de contato são processados pelo Formspree (formspree.io), um serviço terceirizado de envio de formulários. O Formspree processa dados de acordo com sua própria política de privacidade. Recomendamos revisar a política de privacidade do Formspree em formspree.io/legal/privacy-policy.",
      },
      {
        heading: "7. Seus Direitos",
        body: "Nos termos da LGPD, você tem o direito de:\n\n• Acessar os dados pessoais que mantemos sobre você\n• Corrigir dados imprecisos ou incompletos\n• Solicitar a exclusão dos seus dados\n• Revogar o consentimento a qualquer momento\n• Solicitar a portabilidade dos dados\n• Registrar uma reclamação junto à ANPD (Autoridade Nacional de Proteção de Dados)\n\nPara exercer qualquer um desses direitos, entre em contato: trading@cazarini.com",
      },
      {
        heading: "8. Cookies",
        body: "Este site pode utilizar cookies essenciais para garantir o funcionamento adequado. Não utilizamos cookies de publicidade ou rastreamento. Você pode desativar os cookies nas configurações do seu navegador a qualquer momento sem afetar sua capacidade de acessar o site.",
      },
      {
        heading: "9. Segurança",
        body: "Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhuma transmissão pela internet é 100% segura.",
      },
      {
        heading: "10. Alterações nesta Política",
        body: "Podemos atualizar esta Política de Privacidade periodicamente. A versão mais atual estará sempre disponível nesta página com a data da última atualização.",
      },
      {
        heading: "11. Contato",
        body: "Para qualquer dúvida ou solicitação referente a esta Política de Privacidade, entre em contato:\n\nCazarini Trading Company\nVarginha, Minas Gerais, Brasil\nE-mail: trading@cazarini.com\nTelefone: +55 35 8416-0810",
      },
    ],
  },
};

export const PrivacyPolicy = () => {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const c = content[lang];

  return (
    <>
      <SEO
        title={lang === "en" ? "Privacy Policy - Cazarini Trading" : "Política de Privacidade - Cazarini Trading"}
        description={lang === "en" ? "Privacy Policy of Cazarini Trading Company. Learn how we collect, use, and protect your personal data." : "Política de Privacidade da Cazarini Trading Company. Saiba como coletamos, usamos e protegemos seus dados pessoais."}
        keywords={lang === "en" ? "privacy policy, data protection, LGPD, GDPR, Cazarini" : "política de privacidade, proteção de dados, LGPD, Cazarini"}
      />

      <div className="flex flex-col min-h-screen bg-white font-sans">
        {/* Header */}
        <div className="bg-brand-950">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 pt-10">
            <Header variant="dark" />
          </div>
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 py-16">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-accent-green mb-4">
              {lang === "en" ? "Legal" : "Legal"}
            </p>
            <h1 className="text-4xl lg:text-5xl font-editorial italic text-white mb-3">
              {c.title}
            </h1>
            <p className="text-white/40 text-sm">{c.updated}</p>
          </div>
        </div>

        {/* Content */}
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

export default PrivacyPolicy;
