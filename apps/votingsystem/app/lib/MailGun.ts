import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "postmaster@mail.aaraz.me",
    pass: "160427abe7cbb4a1e48f4e5a27c85bbb-623e10c8-a0e8c1b7",
  },
});

export async function SendRegistrationVerificationMail({
  to,
  href,
}: {
  to: string;
  href: string;
}) {
  const info = await transporter.sendMail({
    from: `"Devote" <verify@mail.aaraz.me>`,
    to: to,
    subject: "Devote Verification",
    html: `<div style='padding: 20px'><div style='font-size: 14px;margin-bottom: 10px;'>Verify Your Devote Registration</div><a href=${href} target='_blank' style='background-color:#1165ed;padding: 8px 12px;border-radius: 10px;font-size: 14px; color: #ffffff;text-decoration: none;font-weight:bold;'>Verify Here</a></div>`,
  });
  return info;
}

export async function SendNormalMail({
  to,
  message,
}: {
  to: string;
  message: string;
}) {
  const info = await transporter.sendMail({
    from: `"Devote" <info@mail.aaraz.me>`,
    to: to,
    subject: "Verified Voter of Devote",
    text: message,
  });
  return info;
}
