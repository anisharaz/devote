import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface RegistrationEmailProps {
  userFirstname: string;
  resetPasswordLink: string;
}
export const RegistrationEmail = ({
  userFirstname,
  resetPasswordLink,
}: RegistrationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Dropbox reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://static.aaraz.me/devote_logo.png`}
            width="100"
            height="50"
            alt="Dropbox"
          />
          <Section>
            <Text style={text}>Hi {userFirstname || "User"},</Text>
            <Text style={text}>
              Your recently initiated identity registration process, To complete
              the registration wallet address is required.The link will take you
              to verification page where you can connect desired wallet account
              to complete the registration.
            </Text>
            <Button style={button} href={resetPasswordLink} target="_blank">
              Complete Registration
            </Button>
            <Text style={text}>
              The link will expire in 24 hours, so be sure to use it right away.
            </Text>
            <Text style={text}>
              To keep your account secure, please don&apos;t forward this email
              to anyone. If the email has expired you can regenerate it{" "}
              <Link style={anchor} href="Url">
                Here
              </Link>
            </Text>
            <Text style={text}>Happy Voting!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default RegistrationEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
  cursor: "pointer",
};

const anchor = {
  textDecoration: "underline",
};
