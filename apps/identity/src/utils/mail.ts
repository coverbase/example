import { env } from "@coverbase/http";
import { H3Event } from "h3";

export async function sendMail(event: H3Event, to: string, subject: string, html: string) {
    const { RESEND_KEY } = env(event);

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
