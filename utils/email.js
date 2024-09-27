import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(to, token) {
  const verificationUrl = `${process.env.APP_URL}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: "Verifikasi Email - EduCourse App",
    text: `Silakan verifikasi email Anda dengan mengklik link berikut: ${verificationUrl}`,
    html: `<p>Silakan verifikasi email Anda dengan mengklik link berikut:</p><a href="${verificationUrl}">Verifikasi Email</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email verifikasi dikirim ke: ${to}`);
  } catch (error) {
    console.error("Gagal mengirim email:", error);
    throw new Error("Error saat mengirim email verifikasi");
  }
}
