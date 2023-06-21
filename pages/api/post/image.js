import aws from "aws-sdk";

export default async function handler(request, response) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();

  if (request.method == "GET") {
    const url = await s3.createPresignedPost({
      Bucket: process.env.AWS_BUCKET_NAME,
      Fields: { key: request.query.file },
      Expires: 60, // seconds
      Conditions: [
        ["content-length-range", 0, 1048576], // 파일용량 1MB 까지 제한
      ],
    });

    response.status(200).json(url);
  }

  if (request.method == "DELETE") {
    s3.deleteObject(
      {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: request.query.file.split("/").at(-1),
      },
      (error, data) => {
        if (error) response.status(500).json();
      }
    );

    response.status(200).json();
  }
}
