import * as crypto from "crypto";
const privateKey = process.env.ID_AUTHORITY_PRIVATE_KEY;

export function generateDigitalSignature(data: string): string {
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(data);
  return sign.sign(privateKey as string, "base64");
}
