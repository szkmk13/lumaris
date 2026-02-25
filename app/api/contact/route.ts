import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { resend, COMPANY_EMAIL } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Nieprawidłowe dane" }, { status: 400 });
    }

    const { name, email, phone, message } = parsed.data;

    await resend.emails.send({
      from: "Formularz Lumaris <onboarding@resend.dev>",
      to: COMPANY_EMAIL,
      replyTo: email,
      subject: `Nowe zapytanie od ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
            Nowe zapytanie z formularza kontaktowego
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 120px;"><strong>Imię:</strong></td>
              <td style="padding: 8px 0; color: #1C1C1C;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #1C1C1C;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Telefon:</strong></td>
              <td style="padding: 8px 0; color: #1C1C1C;"><a href="tel:${phone}">${phone}</a></td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px;">
            <strong style="color: #666;">Wiadomość:</strong>
            <p style="color: #1C1C1C; margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}
