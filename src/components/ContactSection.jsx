import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "../hooks/useTranslation";

// Schema will be created inside component to access translations
const getContactSchema = (t) => z.object({
  name: z.string().min(3, t("contact.errorName")),
  company: z.string().min(2, t("contact.errorCompany")),
  email: z.string().email(t("contact.errorEmail")),
  phone: z.string().min(10, t("contact.errorPhone")),
  buyerType: z.enum(
    ["individual", "cooperative", "company", "trader", "exporter"],
    {
      required_error: t("contact.errorBuyerType"),
    }
  ),
  volume: z.enum(["1-50", "51-100", "101-500", "501-1000", "1000+"], {
    required_error: t("contact.errorVolume"),
  }),
  unit: z.enum(["bags", "containers"], {
    required_error: t("contact.errorUnit"),
  }),
  coffeeType: z.array(z.string()).min(1, t("contact.errorCoffeeType")),
  frequency: z.enum(["monthly", "quarterly", "biannual", "annual", "spot"], {
    required_error: t("contact.errorFrequency"),
  }),
  message: z.string().min(20, t("contact.errorMessage")),
});

export default function ContactSection() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactSchema = getContactSchema(t);
  
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      buyerType: undefined,
      volume: undefined,
      unit: "bags",
      coffeeType: [],
      frequency: undefined,
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace YOUR_FORM_ID with your actual Formspree form ID
      // Get it from https://formspree.io/forms after creating a form
      const response = await fetch("https://formspree.io/f/xyzplwpb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          coffeeType: data.coffeeType.join(", "),
          _subject: `New Lead: ${data.name} - ${data.buyerType} - ${data.volume} ${data.unit}`,
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

  return (
    <>
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-8 lg:px-12">
          <div className="w-full overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 px-8 py-12 shadow-[0_18px_45px_rgba(1,2,5,0.14)] sm:px-12 lg:px-16 lg:py-16">
            <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
              <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.5rem]">
                {t("contact.ready")}
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="bg-white py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid w-full gap-8 overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_12px_30px_rgba(1,2,5,0.08)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="relative overflow-hidden">
              <img
                src="./photos/caffe-in-field.jpg"
                alt="Coffee field at sunset"
                className="h-full min-h-[400px] w-full object-cover lg:min-h-[700px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-semibold mb-2">{t("contact.connectTitle")}</h3>
                <p className="text-white/90">
                  {t("contact.connectSubtitle")}
                </p>
              </div>
            </div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 p-8 lg:p-12"
            >
              <div className="mb-2">
                <h3 className="text-2xl font-semibold text-brand-900 mb-2">
                  {t("contact.formTitle")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("contact.formDescription")}
                </p>
              </div>

              {submitStatus === "success" && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-800">
                  ✓ {t("contact.successMessage")}
                </div>
              )}

              {submitStatus === "error" && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
                  ✗ Error sending message. Please try again.
                </div>
              )}

              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-brand-900 mb-2"
                    >
                      {t("contact.name")} {t("contact.required")}
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...form.register("name")}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 placeholder-gray-400 focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
                      placeholder={t("contact.namePlaceholder")}
                    />
                    {form.formState.errors.name && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-brand-900 mb-2"
                    >
                      {t("contact.company")} {t("contact.required")}
                    </label>
                    <input
                      id="company"
                      type="text"
                      {...form.register("company")}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 placeholder-gray-400 focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
                      placeholder={t("contact.companyPlaceholder")}
                    />
                    {form.formState.errors.company && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {form.formState.errors.company.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-brand-900 mb-2"
                    >
                      {t("contact.email")} {t("contact.required")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 placeholder-gray-400 focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
                      placeholder={t("contact.emailPlaceholder")}
                    />
                    {form.formState.errors.email && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-brand-900 mb-2"
                    >
                      {t("contact.phone")} {t("contact.required")}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...form.register("phone")}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 placeholder-gray-400 focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
                      placeholder={t("contact.phonePlaceholder")}
                    />
                    {form.formState.errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {form.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="buyerType"
                    className="block text-sm font-medium text-brand-900 mb-2"
                  >
                    {t("contact.buyerType")} {t("contact.required")}
                  </label>
                  <select
                    id="buyerType"
                    {...form.register("buyerType")}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
                  >
                    <option value="">{t("contact.selectPlaceholder")}</option>
                    <option value="individual">{t("contact.buyerIndividual")}</option>
                    <option value="cooperative">{t("contact.buyerCooperative")}</option>
                    <option value="company">{t("contact.buyerCompany")}</option>
                    <option value="trader">{t("contact.buyerTrader")}</option>
                    <option value="exporter">{t("contact.buyerExporter")}</option>
                  </select>
                  {form.formState.errors.buyerType && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {form.formState.errors.buyerType.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-[1.5fr_1fr]">
                  <div>
                    <label
                      htmlFor="volume"
                      className="block text-sm font-medium text-brand-900 mb-2"
                    >
                      {t("contact.volume")} {t("contact.required")}
                    </label>
                    <select
                      id="volume"
                      {...form.register("volume")}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
                    >
                      <option value="">{t("contact.selectPlaceholder")}</option>
                      <option value="1-50">1 - 50</option>
                      <option value="51-100">51 - 100</option>
                      <option value="101-500">101 - 500</option>
                      <option value="501-1000">501 - 1,000</option>
                      <option value="1000+">1,000+</option>
                    </select>
                    {form.formState.errors.volume && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {form.formState.errors.volume.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="unit"
                      className="block text-sm font-medium text-brand-900 mb-2"
                    >
                      {t("contact.unit")} {t("contact.required")}
                    </label>
                    <select
                      id="unit"
                      {...form.register("unit")}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
                    >
                      <option value="bags">{t("contact.unitBags")}</option>
                      <option value="containers">{t("contact.unitContainers")}</option>
                    </select>
                    {form.formState.errors.unit && (
                      <p className="mt-1.5 text-xs text-red-500">
                        {form.formState.errors.unit.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-900 mb-3">
                    {t("contact.coffeeType")} {t("contact.required")}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "arabica", label: t("contact.coffeeArabica") },
                      { id: "robusta", label: t("contact.coffeeRobusta") },
                      { id: "specialty", label: t("contact.coffeeSpecialty") },
                      { id: "organic", label: t("contact.coffeeOrganic") },
                    ].map((type) => (
                      <label
                        key={type.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={form.watch("coffeeType").includes(type.id)}
                          onChange={() => toggleCoffeeType(type.id)}
                          className="w-4 h-4 rounded border-gray-300 text-brand-900 focus:ring-2 focus:ring-brand-900/20"
                        />
                        <span className="text-sm text-gray-700">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {form.formState.errors.coffeeType && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {form.formState.errors.coffeeType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="frequency"
                    className="block text-sm font-medium text-brand-900 mb-2"
                  >
                    {t("contact.frequency")} {t("contact.required")}
                  </label>
                  <select
                    id="frequency"
                    {...form.register("frequency")}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
                  >
                    <option value="">{t("contact.selectPlaceholder")}</option>
                    <option value="monthly">{t("contact.freqMonthly")}</option>
                    <option value="quarterly">{t("contact.freqQuarterly")}</option>
                    <option value="biannual">{t("contact.freqBiannual")}</option>
                    <option value="annual">{t("contact.freqAnnual")}</option>
                    <option value="spot">{t("contact.freqSpot")}</option>
                  </select>
                  {form.formState.errors.frequency && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {form.formState.errors.frequency.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-brand-900 mb-2"
                  >
                    {t("contact.message")} {t("contact.required")}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...form.register("message")}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 placeholder-gray-400 focus:border-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-900/20"
                    placeholder={t("contact.messagePlaceholder")}
                  />
                  {form.formState.errors.message && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full justify-center rounded-xl bg-brand-900 py-3.5 px-6 font-medium text-white transition-all hover:bg-brand-950 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? t("contact.submitting") : t("contact.submit")}
              </button>

              <p className="text-xs text-center text-gray-500">
                {t("contact.agreement")}
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
