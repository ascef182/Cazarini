import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { useLanguage } from "../context/LanguageContext";

const content = {
  en: {
    title: "Email Policy",
    updated: "Last updated: February 2026",
    sections: [
      {
        heading: "1. Purpose",
        body: "This Email Policy outlines how Cazarini Trading Company uses email communications to interact with clients, partners, and prospective business contacts. We are committed to responsible, transparent, and professional email practices.",
      },
      {
        heading: "2. How We Use Email",
        body: "We use email exclusively for the following purposes:\n\n• Responding to inquiries submitted through our website contact form\n• Sending requested commercial proposals, pricing, or samples information\n• Delivering our weekly market intelligence reports (to opted-in subscribers only)\n• Communicating about active trading contracts and operational matters\n• Sending relevant industry updates to existing business partners",
      },
      {
        heading: "3. Consent and Opt-In",
        body: "We only send commercial or marketing emails to recipients who have:\n\n• Submitted a contact form on our website\n• Explicitly requested to receive market reports or updates\n• Established a direct business relationship with us\n\nWe do not purchase, rent, or use email lists from third parties.",
      },
      {
        heading: "4. Unsubscribe / Opt-Out",
        body: "Every commercial email we send includes an unsubscribe option. You may opt out at any time by:\n\n• Clicking the unsubscribe link in any email\n• Sending an email to trading@cazarini.com with the subject \"Unsubscribe\"\n\nUnsubscribe requests are processed within 5 business days. Transactional emails related to active contracts may still be sent as required.",
      },
      {
        heading: "5. Email Security",
        body: "Cazarini Trading Company will never:\n\n• Request passwords, bank details, or sensitive financial information via email\n• Send attachments you did not request\n• Ask you to click suspicious links to verify account information\n\nIf you receive a suspicious email claiming to be from Cazarini, please report it immediately to trading@cazarini.com.",
      },
      {
        heading: "6. Phishing and Fraud Prevention",
        body: "All official communications from Cazarini Trading Company originate exclusively from the domain @cazarini.com. Be cautious of emails from similar but different domains. When in doubt, call us directly at +55 35 8416-0810 to verify the communication.",
      },
      {
        heading: "7. Data Handling",
        body: "Email addresses and communication records are handled in accordance with our Privacy Policy. We do not share your email address with third parties for marketing purposes. For full details on data handling, please review our Privacy Policy.",
      },
      {
        heading: "8. Contact",
        body: "For questions about this Email Policy or to submit an opt-out request:\n\nCazarini Trading Company\nEmail: trading@cazarini.com\nPhone: +55 35 8416-0810",
      },
    ],
  },
  pt: {
    title: "Política de E-mail",
    updated: "Última atualização: Fevereiro de 2026",
    sections: [
      {
        heading: "1. Objetivo",
        body: "Esta Política de E-mail descreve como a Cazarini Trading Company utiliza comunicações por e-mail para interagir com clientes, parceiros e potenciais contatos comerciais. Estamos comprometidos com práticas de e-mail responsáveis, transparentes e profissionais.",
      },
      {
        heading: "2. Como Utilizamos o E-mail",
        body: "Utilizamos e-mail exclusivamente para os seguintes fins:\n\n• Responder às consultas enviadas pelo formulário de contato do nosso site\n• Enviar propostas comerciais, informações de preços ou amostras solicitadas\n• Entregar nossos relatórios semanais de inteligência de mercado (apenas para assinantes)\n• Comunicar sobre contratos de trading ativos e questões operacionais\n• Enviar atualizações relevantes do setor aos parceiros comerciais existentes",
      },
      {
        heading: "3. Consentimento e Opt-In",
        body: "Enviamos e-mails comerciais ou de marketing somente para destinatários que:\n\n• Submeteram um formulário de contato em nosso site\n• Solicitaram explicitamente receber relatórios de mercado ou atualizações\n• Estabeleceram uma relação comercial direta conosco\n\nNão adquirimos, alugamos ou utilizamos listas de e-mail de terceiros.",
      },
      {
        heading: "4. Cancelamento de Inscrição / Opt-Out",
        body: "Todo e-mail comercial que enviamos inclui uma opção de cancelamento. Você pode optar por não receber mais a qualquer momento:\n\n• Clicando no link de cancelamento em qualquer e-mail\n• Enviando um e-mail para trading@cazarini.com com o assunto \"Cancelar inscrição\"\n\nAs solicitações de cancelamento são processadas em até 5 dias úteis. E-mails transacionais relacionados a contratos ativos ainda poderão ser enviados conforme necessário.",
      },
      {
        heading: "5. Segurança de E-mail",
        body: "A Cazarini Trading Company nunca irá:\n\n• Solicitar senhas, dados bancários ou informações financeiras sensíveis por e-mail\n• Enviar anexos que você não solicitou\n• Pedir que você clique em links suspeitos para verificar informações de conta\n\nSe você receber um e-mail suspeito alegando ser da Cazarini, reporte imediatamente para trading@cazarini.com.",
      },
      {
        heading: "6. Prevenção de Phishing e Fraudes",
        body: "Todas as comunicações oficiais da Cazarini Trading Company se originam exclusivamente do domínio @cazarini.com. Tenha cuidado com e-mails de domínios semelhantes, mas diferentes. Em caso de dúvida, ligue diretamente para +55 35 8416-0810 para verificar a comunicação.",
      },
      {
        heading: "7. Tratamento de Dados",
        body: "Endereços de e-mail e registros de comunicação são tratados de acordo com nossa Política de Privacidade. Não compartilhamos seu endereço de e-mail com terceiros para fins de marketing. Para mais detalhes sobre o tratamento de dados, consulte nossa Política de Privacidade.",
      },
      {
        heading: "8. Contato",
        body: "Para dúvidas sobre esta Política de E-mail ou para enviar uma solicitação de opt-out:\n\nCazarini Trading Company\nE-mail: trading@cazarini.com\nTelefone: +55 35 8416-0810",
      },
    ],
  },
};

export const EmailPolicy = () => {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const c = content[lang];

  return (
    <>
      <SEO
        title={lang === "en" ? "Email Policy - Cazarini Trading" : "Política de E-mail - Cazarini Trading"}
        description={lang === "en" ? "Email Policy of Cazarini Trading Company. Learn how we use email communications and how to opt out." : "Política de E-mail da Cazarini Trading Company. Saiba como utilizamos comunicações por e-mail e como cancelar o recebimento."}
        keywords={lang === "en" ? "email policy, opt-out, unsubscribe, Cazarini" : "política de e-mail, cancelar inscrição, Cazarini"}
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

export default EmailPolicy;
