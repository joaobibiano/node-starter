import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { unlink, writeFile } from 'fs/promises';

export const generateSwagger = async (
  app: NestExpressApplication,
): Promise<void> => {
  try {
    await unlink('./swagger-spec.json');
  } catch {}

  const config = new DocumentBuilder()
    .setTitle('NestJS Api')
    .setDescription('NestJS Api')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  writeFile('./swagger-spec.json', JSON.stringify(document));
};
