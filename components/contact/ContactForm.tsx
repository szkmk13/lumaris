"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";

const schema = z.object({
  name: z.string().min(2, "Imię musi mieć minimum 2 znaki"),
  email: z.email("Podaj poprawny adres email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Wiadomość musi mieć minimum 10 znaków"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Błąd wysyłki");

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-[#1C1C1C] bg-white";
  const errorClass = "mt-1 text-red-500 text-xs";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Imię i nazwisko <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="Jan Kowalski"
            className={inputClass}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="jan@example.com"
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Telefon <span className="text-gray-400 font-normal">(opcjonalnie)</span>
        </label>
        <input
          {...register("phone")}
          type="tel"
          placeholder="+48 500 000 000"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Wiadomość <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Opisz swój projekt lub zadaj pytanie..."
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {status === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          Wiadomość wysłana! Odpiszemy wkrótce.
        </div>
      )}
      {status === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          Wystąpił błąd. Spróbuj ponownie lub napisz bezpośrednio na biuro.lumaris@gmail.com
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto bg-[#D4AF37] text-[#1C1C1C] px-8 py-3.5 rounded-lg font-semibold hover:bg-[#c49b2e] disabled:opacity-60 transition-colors duration-200"
      >
        {status === "sending" ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>
    </form>
  );
}
