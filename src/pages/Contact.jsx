import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "../context/LanguageContext";
import { Header } from "../components/Header";
import { SEO } from "../components/SEO";
import { Footer } from "../components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Globe2,
  ShoppingCart,
  Wheat,
} from "lucide-react";

const getContactSchema = (lang, role) => {
  const base = {
    role: z.enum(["buyer", "producer"], {
      required_error:
        lang === "en"
          ? "Please select your role"
          : "Por favor selecione seu papel",
    }),
    name: z.string().min(3, lang === "en" ? "Name must be at least 3 characters" : "Nome deve ter no mínimo 3 caracteres"),
    company: z.string().min(2, lang === "en" ? "Company must be at least 2 characters" : "Empresa deve ter no mínimo 2 caracteres"),
    email: z.string().email(lang === "en" ? "Please enter a valid email" : "Email inválido"),
    phone: z.string().min(10, lang === "en" ? "Phone must be at least 10 digits" : "Telefone deve ter no mínimo 10 dígitos"),
    message: z.string().min(20, lang === "en" ? "Message must be at least 20 characters" : "Mensagem deve ter no mínimo 20 caracteres"),
  };

  if (role === "producer") {
    return z.object({
      ...base,
      region: z.string().min(2, lang === "en" ? "Please enter your region" : "Informe sua região"),
      farmSize: z.enum(["small", "medium", "large", "cooperative"], {
        required_error: lang === "en" ? "Please select farm size" : "Selecione o tamanho",
      }),
      annualProduction: z.enum(["1-100", "101-500", "501-2000", "2000+"], {
        required_error: lang === "en" ? "Please select production volume" : "Selecione o volume",
      }),
      coffeeType: z.array(z.string()).min(1, lang === "en" ? "Select at least one" : "Selecione pelo menos um"),
      certifications: z.array(z.string()).optional(),
    });
  }

  return z.object({
    ...base,
    buyerType: z.enum(["individual", "cooperative", "company", "trader", "exporter"], {
      required_error: lang === "en" ? "Please select a type" : "Selecione um tipo",
    }),
    volume: z.enum(["1-50", "51-100", "101-500", "501-1000", "1000+"], {
      required_error: lang === "en" ? "Please select volume" : "Selecione o volume",
    }),
    unit: z.enum(["bags", "containers"], {
      required_error: lang === "en" ? "Please select unit" : "Selecione a unidade",
    }),
    coffeeType: z.array(z.string()).min(1, lang === "en" ? "Select at least one coffee type" : "Selecione pelo menos um tipo de café"),
  });
};

export const Contact = () => {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeRole, setActiveRole] = useState(null);

  const contactSchema = getContactSchema(lang, activeRole);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      role: undefined,
      name: "",
      company: "",
      email: "",
      phone: "",
      buyerType: undefined,
      volume: undefined,
      unit: "bags",
      coffeeType: [],
      region: "",
      farmSize: undefined,
      annualProduction: undefined,
      certifications: [],
      message: "",
    },
  });

  const selectedRole = form.watch("role");

  const handleRoleChange = (role) => {
    setActiveRole(role);
    form.setValue("role", role);
    // Reset role-specific fields
    form.setValue("buyerType", undefined);
    form.setValue("volume", undefined);
    form.setValue("coffeeType", []);
    form.setValue("region", "");
    form.setValue("farmSize", undefined);
    form.setValue("annualProduction", undefined);
    form.setValue("certifications", []);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/xyzplwpb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          coffeeType: data.coffeeType.join(", "),
          _subject: `New ${data.role} Lead: ${data.name} - ${data.buyerType} - ${data.volume} ${data.unit}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCoffeeType = (type) => {
    const current = form.watch("coffeeType");
    if (current.includes(type)) {
      form.setValue(
        "coffeeType",
        current.filter((t) => t !== type)
      );
    } else {
      form.setValue("coffeeType", [...current, type]);
    }
  };

  const content = {
    hero: {
      en: {
        title: "Get in touch with our",
        highlight: "coffee experts",
        subtitle:
          "Whether you're looking to source premium beans or want to sell your production to global markets, our team is ready to assist you.",
      },
      pt: {
        title: "Entre em contato com nossos",
        highlight: "especialistas em café",
        subtitle:
          "Seja para comprar grãos premium ou vender sua produção para mercados globais, nossa equipe está pronta para ajudá-lo.",
      },
    },
    role: {
      en: {
        label: "I AM A...",
        buyer: "Coffee Buyer",
        buyerDesc: "I want to source and purchase green coffee",
        producer: "Coffee Producer",
        producerDesc: "I want to sell my coffee production",
      },
      pt: {
        label: "EU SOU...",
        buyer: "Comprador de Café",
        buyerDesc: "Quero comprar café verde",
        producer: "Produtor de Café",
        producerDesc: "Quero vender minha produção de café",
      },
    },
    form: {
      en: {
        title: "Send us a message",
        name: "Full Name",
        namePh: "John Doe",
        company: "Company Name",
        companyPh: "Your Coffee Company",
        email: "Work Email",
        emailPh: "john@company.com",
        phone: "Phone",
        phonePh: "+1 (555) 123-4567",
        buyerType: "Organization Type",
        selectPh: "Select...",
        individual: "Individual Buyer",
        cooperative: "Cooperative",
        companyType: "Company",
        trader: "Trader",
        exporter: "Exporter",
        volume: "Expected Volume",
        unit: "Unit",
        bags: "Bags (60kg)",
        containers: "Containers",
        coffeeType: "Coffee Type",
        arabica: "Arabica",
        robusta: "Robusta/Conilon",
        specialty: "Specialty",
        organic: "Organic",
        message: "Message",
        messagePh: "How can we help you with your coffee trading needs?",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Message sent successfully! We'll be in touch soon.",
        agreement:
          "By submitting, you agree to our privacy policy and terms of service.",
      },
      pt: {
        title: "Envie uma mensagem",
        name: "Nome Completo",
        namePh: "João Silva",
        company: "Nome da Empresa",
        companyPh: "Sua Empresa de Café",
        email: "Email Profissional",
        emailPh: "joao@empresa.com",
        phone: "Telefone",
        phonePh: "+55 (35) 1234-5678",
        buyerType: "Tipo de Organização",
        selectPh: "Selecione...",
        individual: "Comprador Individual",
        cooperative: "Cooperativa",
        companyType: "Empresa",
        trader: "Trader",
        exporter: "Exportador",
        volume: "Volume Esperado",
        unit: "Unidade",
        bags: "Sacas (60kg)",
        containers: "Containers",
        coffeeType: "Tipo de Café",
        arabica: "Arábica",
        robusta: "Robusta/Conilon",
        specialty: "Especial",
        organic: "Orgânico",
        message: "Mensagem",
        messagePh:
          "Como podemos ajudá-lo com suas necessidades de comércio de café?",
        submit: "Enviar Mensagem",
        submitting: "Enviando...",
        success:
          "Mensagem enviada com sucesso! Entraremos em contato em breve.",
        agreement:
          "Ao enviar, você concorda com nossa política de privacidade e termos de serviço.",
      },
    },
    info: {
      en: [
        {
          icon: Mail,
          title: "Email Us",
          lines: ["info@cazarinitrading.com", "trade@cazarinitrading.com"],
        },
        {
          icon: Phone,
          title: "Call Us",
          lines: ["+55 (35) 3222-5678", "+55 (35) 99876-5432"],
        },
        {
          icon: MapPin,
          title: "Visit Us",
          lines: ["Varginha, MG", "Brazil - Coffee Capital"],
        },
        {
          icon: Globe2,
          title: "Social Media",
          lines: ["LinkedIn", "Instagram"],
          isLinks: true,
        },
      ],
      pt: [
        {
          icon: Mail,
          title: "Email",
          lines: ["info@cazarinitrading.com", "trade@cazarinitrading.com"],
        },
        {
          icon: Phone,
          title: "Telefone",
          lines: ["+55 (35) 3222-5678", "+55 (35) 99876-5432"],
        },
        {
          icon: MapPin,
          title: "Visite-nos",
          lines: ["Varginha, MG", "Brasil - Capital do Café"],
        },
        {
          icon: Globe2,
          title: "Redes Sociais",
          lines: ["LinkedIn", "Instagram"],
          isLinks: true,
        },
      ],
    },
  };

  const f = content.form[lang];

  return (
    <>
      <SEO
        title={
          lang === "en"
            ? "Contact - Cazarini Coffee Trading"
            : "Contato - Cazarini Trading de Café"
        }
        description={
          lang === "en"
            ? "Contact Cazarini Trading Company. Get in touch with our coffee experts for sourcing, trading, or selling premium Brazilian coffee."
            : "Entre em contato com a Cazarini Trading Company. Fale com nossos especialistas para compra, trading ou venda de café brasileiro premium."
        }
        keywords={
          lang === "en"
            ? "contact coffee broker, coffee trading contact, buy brazilian coffee, sell coffee production"
            : "contato corretor café, contato trading café, comprar café brasileiro, vender produção café"
        }
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
            <Header variant="light" />
          </div>
        </nav>

        {/* Hero */}
        <header className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            {content.hero[lang].title}
            <br />
            <span className="text-accent-green italic font-editorial">
              {content.hero[lang].highlight}
            </span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            {content.hero[lang].subtitle}
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form Card */}
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
              <h2 className="text-2xl font-bold mb-8">{f.title}</h2>

              {/* Role Selector - Buyer vs Producer */}
              <div className="mb-8">
                <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider block mb-3">
                  {content.role[lang].label}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleRoleChange("buyer")}
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                      selectedRole === "buyer"
                        ? "border-accent-green bg-accent-green/5 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <ShoppingCart
                      className={`w-8 h-8 ${selectedRole === "buyer" ? "text-accent-green" : "text-gray-400"}`}
                    />
                    <div className="text-center">
                      <p
                        className={`font-semibold text-sm ${selectedRole === "buyer" ? "text-brand-900" : "text-gray-700"}`}
                      >
                        {content.role[lang].buyer}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {content.role[lang].buyerDesc}
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange("producer")}
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                      selectedRole === "producer"
                        ? "border-accent-green bg-accent-green/5 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Wheat
                      className={`w-8 h-8 ${selectedRole === "producer" ? "text-accent-green" : "text-gray-400"}`}
                    />
                    <div className="text-center">
                      <p
                        className={`font-semibold text-sm ${selectedRole === "producer" ? "text-brand-900" : "text-gray-700"}`}
                      >
                        {content.role[lang].producer}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {content.role[lang].producerDesc}
                      </p>
                    </div>
                  </button>
                </div>
                {form.formState.errors.role && (
                  <p className="mt-2 text-xs text-red-500">
                    {form.formState.errors.role.message}
                  </p>
                )}
              </div>

              {submitStatus === "success" && (
                <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-800 mb-6">
                  {f.success}
                </div>
              )}

              {submitStatus === "error" && (
                <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800 mb-6">
                  Error sending message. Please try again.
                </div>
              )}

              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name + Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      {f.name}
                    </label>
                    <input
                      type="text"
                      {...form.register("name")}
                      className="w-full bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent-green py-4 px-5 transition-all outline-none text-sm"
                      placeholder={f.namePh}
                    />
                    {form.formState.errors.name && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      {f.email}
                    </label>
                    <input
                      type="email"
                      {...form.register("email")}
                      className="w-full bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent-green py-4 px-5 transition-all outline-none text-sm"
                      placeholder={f.emailPh}
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Company + Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      {f.company}
                    </label>
                    <input
                      type="text"
                      {...form.register("company")}
                      className="w-full bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent-green py-4 px-5 transition-all outline-none text-sm"
                      placeholder={f.companyPh}
                    />
                    {form.formState.errors.company && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.company.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      {f.phone}
                    </label>
                    <input
                      type="tel"
                      {...form.register("phone")}
                      className="w-full bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent-green py-4 px-5 transition-all outline-none text-sm"
                      placeholder={f.phonePh}
                    />
                    {form.formState.errors.phone && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Organization Type */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {f.buyerType}
                  </label>
                  <select
                    {...form.register("buyerType")}
                    className="w-full bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent-green py-4 px-5 transition-all outline-none text-sm"
                  >
                    <option value="">{f.selectPh}</option>
                    <option value="individual">{f.individual}</option>
                    <option value="cooperative">{f.cooperative}</option>
                    <option value="company">{f.companyType}</option>
                    <option value="trader">{f.trader}</option>
                    <option value="exporter">{f.exporter}</option>
                  </select>
                  {form.formState.errors.buyerType && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.buyerType.message}
                    </p>
                  )}
                </div>

                {/* Volume + Unit */}
                <div className="grid grid-cols-[1.5fr_1fr] gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      {f.volume}
                    </label>
                    <select
                      {...form.register("volume")}
                      className="w-full bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent-green py-4 px-5 transition-all outline-none text-sm"
                    >
                      <option value="">{f.selectPh}</option>
                      <option value="1-50">1 - 50</option>
                      <option value="51-100">51 - 100</option>
                      <option value="101-500">101 - 500</option>
                      <option value="501-1000">501 - 1,000</option>
                      <option value="1000+">1,000+</option>
                    </select>
                    {form.formState.errors.volume && (
                      <p className="text-xs text-red-500">
                        {form.formState.errors.volume.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                      {f.unit}
                    </label>
                    <select
                      {...form.register("unit")}
                      className="w-full bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent-green py-4 px-5 transition-all outline-none text-sm"
                    >
                      <option value="bags">{f.bags}</option>
                      <option value="containers">{f.containers}</option>
                    </select>
                  </div>
                </div>

                {/* Coffee Type */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {f.coffeeType}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "arabica", label: f.arabica },
                      { id: "robusta", label: f.robusta },
                      { id: "specialty", label: f.specialty },
                      { id: "organic", label: f.organic },
                    ].map((type) => (
                      <label
                        key={type.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          form.watch("coffeeType").includes(type.id)
                            ? "border-accent-green bg-accent-green/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.watch("coffeeType").includes(type.id)}
                          onChange={() => toggleCoffeeType(type.id)}
                          className="w-4 h-4 rounded border-gray-300 text-accent-green focus:ring-2 focus:ring-accent-green/20"
                        />
                        <span className="text-sm text-gray-700">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {form.formState.errors.coffeeType && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.coffeeType.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    {f.message}
                  </label>
                  <textarea
                    rows={4}
                    {...form.register("message")}
                    className="w-full bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent-green py-4 px-5 transition-all outline-none resize-none text-sm"
                    placeholder={f.messagePh}
                  />
                  {form.formState.errors.message && (
                    <p className="text-xs text-red-500">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-green text-brand-900 font-bold py-5 rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? f.submitting : f.submit}</span>
                  <Send className="w-4 h-4" />
                </button>

                <p className="text-xs text-center text-gray-400">
                  {f.agreement}
                </p>
              </form>
            </div>

            {/* Right Column - Info + Map */}
            <div className="space-y-12 lg:pl-6">
              {/* Contact Info Grid */}
              <div className="grid sm:grid-cols-2 gap-8">
                {content.info[lang].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-12 h-12 bg-accent-green/10 rounded-2xl flex items-center justify-center text-accent-green">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    {item.isLinks ? (
                      <div className="flex gap-4">
                        {item.lines.map((line, j) => (
                          <span
                            key={j}
                            className="text-gray-500 hover:text-accent-green transition-colors cursor-pointer"
                          >
                            {line}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 leading-relaxed">
                        {item.lines.join("\n")}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Map Section */}
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden bg-gray-200 group">
                <img
                  src="/photos/caffe-in-field.jpg"
                  alt="Coffee growing region"
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-2xl shadow-2xl flex items-center gap-4 max-w-xs">
                    <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-brand-900" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Cazarini Trading HQ</p>
                      <p className="text-xs text-gray-500">
                        Varginha, MG - Brazil
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-6 right-6">
                  <a
                    href="https://maps.google.com/?q=Varginha,MG,Brazil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-black transition-colors"
                  >
                    {lang === "en"
                      ? "Open in Google Maps"
                      : "Abrir no Google Maps"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
