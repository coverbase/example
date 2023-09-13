import { Context } from "hono";
import { env } from "hono/adapter";

export async function sendMail(context: Context, to: string, subject: string, html: string) {
    const { RESEND_KEY } = env(context);

    await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${RESEND_KEY}`,
        },
        body: JSON.stringify({
            from: "Coverbase <noreply@transactional.coverbase.co>",
            to: [to],
            subject: subject,
            html: html,
        }),
    });
}
