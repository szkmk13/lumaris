import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const COMPANY_EMAIL = process.env.COMPANY_EMAIL ?? "biuro.lumaris@gmail.com";
