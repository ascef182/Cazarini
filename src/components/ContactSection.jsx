import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(3, "Please enter your full name"),
  company: z.string().min(2, "Please enter your company name"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Please provide more details"),
});

export const ContactSection = () => {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", company: "", email: "", message: "" },
  });

  const onSubmit = (data) => {
    console.table(data);
    form.reset();
  };

  return (
    <>
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="w-full overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 px-8 py-12 shadow-[0_18px_45px_rgba(1,2,5,0.14)] sm:px-12 lg:px-16 lg:py-16">
            <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
              <h2 className="text-balance text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.5rem]">
                Ready to work with us ?
              </h2>
              <button className="pill-button shrink-0 rounded-pill bg-white px-8 text-brand-900 hover:bg-gray-50">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="bg-white py-16 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="grid w-full gap-8 overflow-hidden rounded-[32px] border border-gray-100 bg-white shadow-[0_12px_30px_rgba(1,2,5,0.08)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
            <div className="relative overflow-hidden">
              <img
                src="/photos/caffe-in-field.jpg"
                alt="Coffee field at sunset"
                className="h-full min-h-[400px] w-full object-cover lg:min-h-[600px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent" />
            </div>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6 p-8 lg:p-12"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-brand-900"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...form.register("name")}
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 placeholder-gray-400 focus:border-brand-900 focus:outline-none focus:ring-1 focus:ring-brand-900"
                    placeholder="Write your name..."
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-brand-900"
                  >
                    Company name
                  </label>
                  <input
                    id="company"
                    type="text"
                    {...form.register("company")}
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 placeholder-gray-400 focus:border-brand-900 focus:outline-none focus:ring-1 focus:ring-brand-900"
                    placeholder="Write your Company name..."
                  />
                  {form.formState.errors.company && (
                    <p className="mt-1 text-xs text-red-500">
                      {form.formState.errors.company.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-brand-900"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 placeholder-gray-400 focus:border-brand-900 focus:outline-none focus:ring-1 focus:ring-brand-900"
                    placeholder="Write your email contact here..."
                  />
                  {form.formState.errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-brand-900"
                  >
                    How can we help?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...form.register("message")}
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-900 placeholder-gray-400 focus:border-brand-900 focus:outline-none focus:ring-1 focus:ring-brand-900"
                    placeholder="Write your message here..."
                  />
                  {form.formState.errors.message && (
                    <p className="mt-1 text-xs text-red-500">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="pill-button w-full justify-center rounded-xl bg-brand-900 py-3.5 text-white hover:bg-brand-950 disabled:opacity-60"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
