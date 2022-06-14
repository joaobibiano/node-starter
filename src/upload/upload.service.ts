import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ImageUpload } from './dto/image-upload.dto';

@Injectable()
export class UploadService {
  async upload(file: Express.Multer.File) {
    const s3 = new S3({
      region: process.env.AWS_S3_REGION,
    });

    const fileName = new Date().toISOString() + '_' + file.originalname;

    if (!file || !file.originalname) {
      throw new Error('invalid file');
    }

    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_S3,
        Key: fileName,
        Body: file.buffer,
      })
      .promise();

    const responseData = {
      url: uploadResult.Location,
      key: uploadResult.Key,
      bucket: uploadResult.Bucket,
      tag: uploadResult.ETag,
    };

    return responseData;
  }

  async remove(file: ImageUpload) {
    const s3 = new S3({
      region: process.env.AWS_S3_REGION,
    });

    if (!file) {
      throw new Error('invalid file');
    }

    await s3
      .deleteObject({
        Bucket: file.bucket,
        Key: file.key,
      })
      .promise();

    return true;
  }
}
