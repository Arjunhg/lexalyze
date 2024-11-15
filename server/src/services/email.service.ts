import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL || "onboarding@resend.dev";
const SENDER_NAME = process.env.SENDER_NAME || "Acme";
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "tixie92@gmail.com";

export const resend = new Resend(RESEND_API_KEY);

export const sendPremiumConfirmationEmail = async (
  userEmail: string,
  userName: string = "valued user"
) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <p>Hi ${userName},</p>
        <p>Welcome to Premium! You're now a Premium user and have exclusive access to our best features.</p>
        <p>We're excited to have you on board and hope you enjoy all the new benefits.</p>
        <br />
        <p>If you have any questions, feel free to reach out to us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
        <p>Best regards,<br />The ${SENDER_NAME} Team</p>
        <hr />
        <p style="font-size: 12px; color: #888;">You are receiving this email because you subscribed to Premium. If you’d like to unsubscribe, please click <a href="https://example.com/unsubscribe">here</a>.</p>
      </div>`;

    await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: userEmail,
      subject: "Welcome to Premium!",
      html: htmlContent,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
