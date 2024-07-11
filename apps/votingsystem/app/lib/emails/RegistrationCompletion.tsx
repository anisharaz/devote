import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

export const RegistrationCompletion = (profileurl: string) => {
  return (
    <Html>
      <Head />
      <Preview>Devote Welcome</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#2250f4",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Img
            src={`https://static.aaraz.me/devote_logo.png`}
            width="184"
            height="75"
            alt="Netlify"
            className="mx-auto my-20"
          />
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-8">
              Welcome to Devote
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Congratulations! You are now a verified user of devote & you
                  can download your ID certificate from the below link
                </Text>
                <Button
                  className="bg-brand text-white rounded-lg py-3 px-[18px]"
                  href={process.env.DEVOTE_DEPLOYMENT_URL + "/downloadidentity"}
                  target="_blank"
                >
                  Download ID Certificate
                </Button>
                <Text className="text-base">
                  Your can see your registration status and detail on below link
                </Text>
              </Row>
            </Section>

            <Section>
              <Button
                className="bg-brand text-white rounded-lg py-3 px-[18px]"
                href={profileurl}
              >
                View Your Info Here
              </Button>
            </Section>
          </Container>

          <Container className="mt-20">
            <Text className="text-center text-gray-400 mb-45">
              Netlify, 44 Montgomery Street, Suite 300 San Francisco, CA
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default RegistrationCompletion;
