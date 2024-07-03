import * as crypto from "crypto";
const privateKey = process.env.ID_AUTHORITY_PRIVATE_KEY;
const publicKey = process.env.ID_AUTHORITY_PUBLIC_KEY;
export function generateDigitalSignature(data: string): string {
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(data);
  return sign.sign(privateKey as string, "base64");
}

export function validateDigitalSignature(
  data: string,
  receivedSignature: string
): boolean {
  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(data);
  return verify.verify(publicKey as string, receivedSignature, "base64");
}
