import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuid } from "uuid";
export const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET as string,
  },
});

export async function GetPreSignedUrl() {
  const key = `devote/candidates/${uuid()}.jpg`;
  const { BUCKET_NAME } = process.env;
  const { url, fields } = await createPresignedPost(s3Client, {
    Bucket: BUCKET_NAME as string,
    Key: key,
    Conditions: [
      ["content-length-range", 0, 5 * 1024 * 1024], // 5 MB max
    ],
    Fields: {
      success_action_status: "201",
      "Content-Type": "image/jpg",
    },
    Expires: 3600,
  });
  return { url, fields, key };
}
