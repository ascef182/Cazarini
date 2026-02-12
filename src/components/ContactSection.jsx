import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "../context/LanguageContext";
import { ShoppingCart, Wheat, Send } from "lucide-react";

const getContactSchema = (lang, role) => {
  const base = {
    role: z.enum(["buyer", "producer"], {
      required_error:
        lang === "en"
          ? "Please select your role"
          : "Por favor selecione seu papel",
    }),
    name: z
      .string()
      .min(
        3,
        lang === "en"
          ? "Name must be at least 3 characters"
          : "Nome deve ter no mínimo 3 caracteres",
      ),
    company: z
      .string()
      .min(
        2,
        lang === "en"
          ? "Company must be at least 2 characters"
          : "Empresa deve ter no mínimo 2 caracteres",
      ),
    email: z
      .string()
      .email(lang === "en" ? "Please enter a valid email" : "Email inválido"),
    phone: z
      .string()
      .min(
        10,
        lang === "en"
          ? "Phone must be at least 10 digits"
          : "Telefone deve ter no mínimo 10 dígitos",
      ),
    message: z
      .string()
      .min(
        20,
        lang === "en"
          ? "Message must be at least 20 characters"
          : "Mensagem deve ter no mínimo 20 caracteres",
      ),
  };

  if (role === "producer") {
    return z.object({
      ...base,
      region: z
        .string()
        .min(
          2,
          lang === "en" ? "Please enter your region" : "Informe sua região",
        ),
      farmSize: z.enum(["small", "medium", "large", "cooperative"], {
        required_error:
          lang === "en" ? "Please select farm size" : "Selecione o tamanho",
      }),
      annualProduction: z.enum(["1-100", "101-500", "501-2000", "2000+"], {
        required_error:
          lang === "en"
            ? "Please select production volume"
            : "Selecione o volume",
      }),
      coffeeType: z
        .array(z.string())
        .min(
          1,
          lang === "en" ? "Select at least one" : "Selecione pelo menos um",
        ),
      certifications: z.array(z.string()).optional(),
    });
  }

  return z.object({
    ...base,
    buyerType: z.enum(
      ["individual", "cooperative", "company", "trader", "exporter"],
      {
        required_error:
          lang === "en" ? "Please select a type" : "Selecione um tipo",
      },
    ),
    volume: z.enum(["1-50", "51-100", "101-500", "501-1000", "1000+"], {
      required_error:
        lang === "en" ? "Please select volume" : "Selecione o volume",
    }),
    unit: z.enum(["bags", "containers"], {
      required_error:
        lang === "en" ? "Please select unit" : "Selecione a unidade",
    }),
    coffeeType: z
      .array(z.string())
      .min(
        1,
        lang === "en"
          ? "Select at least one coffee type"
          : "Selecione pelo menos um tipo de café",
      ),
  });
};

const content = {
  en: {
    connectTitle: "Let's Build Something Together",
    connectSubtitle: "From farm to port, we're your trusted partner in Brazilian coffee trading.",
    role: { label: "I AM A...", buyer: "Coffee Buyer", buyerDesc: "I want to source and purchase green coffee", producer: "Coffee Producer", producerDesc: "I want to sell my coffee production" },
    title: "Send us a message",
    name: "Full Name",
    namePh: "John Doe",
    company: "Company / Farm Name",
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
    coffeeType: "Coffee Types",
    arabica: "Arabica",
    robusta: "Robusta/Conilon",
    specialty: "Specialty",
    organic: "Organic",
    message: "Message",
    messagePh: "How can we help you with your coffee trading needs?",
    messageBuyerPh: "Tell us about your sourcing needs, preferred origins, and quality specifications...",
    messageProducerPh: "Tell us about your farm, production capacity, and what makes your coffee unique...",
    submit: "Send Message",
    submitting: "Sending...",
    success: "Message sent successfully! We'll be in touch soon.",
    agreement: "By submitting, you agree to our privacy policy and terms of service.",
    region: "Growing Region",
    regionPh: "e.g. Cerrado Mineiro, Mogiana",
    farmSize: "Farm Size",
    small: "Small (up to 20 ha)",
    medium: "Medium (20–100 ha)",
    large: "Large (100+ ha)",
    cooperativeSize: "Cooperative",
    annualProduction: "Annual Production (bags 60kg)",
    certifications: "Certifications",
    utzcert: "UTZ / Rainforest",
    fairtrade: "Fair Trade",
    fourC: "4C",
    sca: "SCA 80+",
  },
  pt: {
    connectTitle: "Vamos Construir Juntos",
    connectSubtitle: "Da fazenda ao porto, somos seu parceiro de confiança no comércio de café brasileiro.",
    role: { label: "EU SOU...", buyer: "Comprador de Café", buyerDesc: "Quero comprar café verde", producer: "Produtor de Café", producerDesc: "Quero vender minha produção de café" },
    title: "Envie uma mensagem",
    name: "Nome Completo",
    namePh: "João Silva",
    company: "Empresa / Fazenda",
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
    coffeeType: "Tipos de Café",
    arabica: "Arábica",
    robusta: "Robusta/Conilon",
    specialty: "Especial",
    organic: "Orgânico",
    message: "Mensagem",
    messagePh: "Como podemos ajudá-lo com suas necessidades de comércio de café?",
    messageBuyerPh: "Conte-nos sobre suas necessidades de sourcing, origens preferidas e especificações de qualidade...",
    messageProducerPh: "Conte-nos sobre sua fazenda, capacidade produtiva e o que torna seu café especial...",
    submit: "Enviar Mensagem",
    submitting: "Enviando...",
    success: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    agreement: "Ao enviar, você concorda com nossa política de privacidade e termos de serviço.",
    region: "Região de Cultivo",
    regionPh: "ex. Cerrado Mineiro, Mogiana",
    farmSize: "Tamanho da Propriedade",
    small: "Pequena (até 20 ha)",
    medium: "Média (20–100 ha)",
    large: "Grande (100+ ha)",
    cooperativeSize: "Cooperativa",
    annualProduction: "Produção Anual (sacas 60kg)",
    certifications: "Certificações",
    utzcert: "UTZ / Rainforest",
    fairtrade: "Fair Trade",
    fourC: "4C",
    sca: "SCA 80+",
  },
};

export default function ContactSection() {
  const { isPortuguese } = useLanguage();
  const lang = isPortuguese ? "pt" : "en";
  const f = content[lang];

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
          certifications: (data.certifications || []).join(", "),
          _subject: `New ${data.role} Lead: ${data.name} - ${data.company}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
        setActiveRole(null);
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
      form.setValue("coffeeType", current.filter((t) => t !== type));
    } else {
      form.setValue("coffeeType", [...current, type]);
    }
  };

  const inputClass =
    "w-full bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-accent-green py-4 px-5 transition-all outline-none text-sm";
  const labelClass =
    "text-sm font-semibold text-gray-500 uppercase tracking-wider";

  return (
    <section id="contact" className="bg-white py-16 lg:py-20">
      <div className="mx-auto flex w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid w-full gap-0 overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_12px_30px_rgba(1,2,5,0.08)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          {/* Left - Image */}
          <div className="relative overflow-hidden min-h-[400px] lg:min-h-full">
            <img
              src="/photos/caffe-in-field.jpg"
              alt="Coffee field at sunset"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 via-brand-900/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white z-10">
              <h3 className="text-2xl font-semibold mb-2">{f.connectTitle}</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {f.connectSubtitle}
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-brand-900 mb-8">
              {f.title}
            </h3>

            {/* Role Selector - Card style */}
            <div className="mb-8">
              <label className={`${labelClass} block mb-3`}>
                {f.role.label}
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
                    <p className={`font-semibold text-sm ${selectedRole === "buyer" ? "text-brand-900" : "text-gray-700"}`}>
                      {f.role.buyer}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {f.role.buyerDesc}
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
                    <p className={`font-semibold text-sm ${selectedRole === "producer" ? "text-brand-900" : "text-gray-700"}`}>
                      {f.role.producer}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {f.role.producerDesc}
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

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}>{f.name}</label>
                  <input
                    type="text"
                    {...form.register("name")}
                    className={inputClass}
                    placeholder={f.namePh}
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>{f.email}</label>
                  <input
                    type="email"
                    {...form.register("email")}
                    className={inputClass}
                    placeholder={f.emailPh}
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Company + Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelClass}>{f.company}</label>
                  <input
                    type="text"
                    {...form.register("company")}
                    className={inputClass}
                    placeholder={f.companyPh}
                  />
                  {form.formState.errors.company && (
                    <p className="text-xs text-red-500">{form.formState.errors.company.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className={labelClass}>{f.phone}</label>
                  <input
                    type="tel"
                    {...form.register("phone")}
                    className={inputClass}
                    placeholder={f.phonePh}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* ── BUYER-SPECIFIC FIELDS ── */}
              {selectedRole === "buyer" && (
                <>
                  <div className="space-y-2">
                    <label className={labelClass}>{f.buyerType}</label>
                    <select {...form.register("buyerType")} className={inputClass}>
                      <option value="">{f.selectPh}</option>
                      <option value="individual">{f.individual}</option>
                      <option value="cooperative">{f.cooperative}</option>
                      <option value="company">{f.companyType}</option>
                      <option value="trader">{f.trader}</option>
                      <option value="exporter">{f.exporter}</option>
                    </select>
                    {form.formState.errors.buyerType && (
                      <p className="text-xs text-red-500">{form.formState.errors.buyerType.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-[1.5fr_1fr] gap-6">
                    <div className="space-y-2">
                      <label className={labelClass}>{f.volume}</label>
                      <select {...form.register("volume")} className={inputClass}>
                        <option value="">{f.selectPh}</option>
                        <option value="1-50">1 - 50</option>
                        <option value="51-100">51 - 100</option>
                        <option value="101-500">101 - 500</option>
                        <option value="501-1000">501 - 1,000</option>
                        <option value="1000+">1,000+</option>
                      </select>
                      {form.formState.errors.volume && (
                        <p className="text-xs text-red-500">{form.formState.errors.volume.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>{f.unit}</label>
                      <select {...form.register("unit")} className={inputClass}>
                        <option value="bags">{f.bags}</option>
                        <option value="containers">{f.containers}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className={labelClass}>{f.coffeeType}</label>
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
                          <span className="text-sm text-gray-700">{type.label}</span>
                        </label>
                      ))}
                    </div>
                    {form.formState.errors.coffeeType && (
                      <p className="text-xs text-red-500">{form.formState.errors.coffeeType.message}</p>
                    )}
                  </div>
                </>
              )}

              {/* ── PRODUCER-SPECIFIC FIELDS ── */}
              {selectedRole === "producer" && (
                <>
                  <div className="space-y-2">
                    <label className={labelClass}>{f.region}</label>
                    <input
                      type="text"
                      {...form.register("region")}
                      className={inputClass}
                      placeholder={f.regionPh}
                    />
                    {form.formState.errors.region && (
                      <p className="text-xs text-red-500">{form.formState.errors.region.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={labelClass}>{f.farmSize}</label>
                      <select {...form.register("farmSize")} className={inputClass}>
                        <option value="">{f.selectPh}</option>
                        <option value="small">{f.small}</option>
                        <option value="medium">{f.medium}</option>
                        <option value="large">{f.large}</option>
                        <option value="cooperative">{f.cooperativeSize}</option>
                      </select>
                      {form.formState.errors.farmSize && (
                        <p className="text-xs text-red-500">{form.formState.errors.farmSize.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>{f.annualProduction}</label>
                      <select {...form.register("annualProduction")} className={inputClass}>
                        <option value="">{f.selectPh}</option>
                        <option value="1-100">1 - 100</option>
                        <option value="101-500">101 - 500</option>
                        <option value="501-2000">501 - 2,000</option>
                        <option value="2000+">2,000+</option>
                      </select>
                      {form.formState.errors.annualProduction && (
                        <p className="text-xs text-red-500">{form.formState.errors.annualProduction.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className={labelClass}>{f.coffeeType}</label>
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
                          <span className="text-sm text-gray-700">{type.label}</span>
                        </label>
                      ))}
                    </div>
                    {form.formState.errors.coffeeType && (
                      <p className="text-xs text-red-500">{form.formState.errors.coffeeType.message}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className={labelClass}>{f.certifications}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { id: "utz", label: f.utzcert },
                        { id: "fairtrade", label: f.fairtrade },
                        { id: "4c", label: f.fourC },
                        { id: "sca80", label: f.sca },
                      ].map((cert) => (
                        <label
                          key={cert.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            (form.watch("certifications") || []).includes(cert.id)
                              ? "border-accent-green bg-accent-green/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={(form.watch("certifications") || []).includes(cert.id)}
                            onChange={() => {
                              const current = form.watch("certifications") || [];
                              if (current.includes(cert.id)) {
                                form.setValue("certifications", current.filter((c) => c !== cert.id));
                              } else {
                                form.setValue("certifications", [...current, cert.id]);
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-300 text-accent-green focus:ring-2 focus:ring-accent-green/20"
                          />
                          <span className="text-sm text-gray-700">{cert.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Message */}
              <div className="space-y-2">
                <label className={labelClass}>{f.message}</label>
                <textarea
                  rows={4}
                  {...form.register("message")}
                  className={`${inputClass} resize-none`}
                  placeholder={
                    selectedRole === "producer"
                      ? f.messageProducerPh
                      : selectedRole === "buyer"
                        ? f.messageBuyerPh
                        : f.messagePh
                  }
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-red-500">{form.formState.errors.message.message}</p>
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
        </div>
      </div>
    </section>
  );
}
