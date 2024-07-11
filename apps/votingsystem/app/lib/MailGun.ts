import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import RegistrationEmail from "./emails/RegistrationEmail";
import RegistrationCompletion from "./emails/RegistrationCompletion";

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAILGUN_SMPT_USER,
    pass: process.env.MAILGUN_SMPT_PASS,
  },
});

export async function SendRegistrationVerificationMail({
  to,
  href,
  firstname,
}: {
  to: string;
  href: string;
  firstname: string;
}) {
  const info = await transporter.sendMail({
    from: `"Devote" <verify@mail.aaraz.me>`,
    to: to,
    subject: "Devote registeration Completion",
    html: render(
      RegistrationEmail({ userFirstname: firstname, resetPasswordLink: href })
    ),
  });
  return info;
}

export async function SendNormalMail({
  to,
  publickey,
}: {
  to: string;
  publickey: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"Devote" <info@mail.aaraz.me>`,
      to: to,
      subject: "Your Are Verified User Now",
      html: render(
        RegistrationCompletion(
          `${process.env.DEVOTE_DEPLOYMENT_URL}/voteridentity/${publickey}`
        )
      ),
    });
    return info;
  } catch (error) {
    console.log(error);
  }
}
