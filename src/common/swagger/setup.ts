import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { pkgInfo } from '@/shared/utils';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(pkgInfo.name)
    .setDescription(pkgInfo.description)
    .setVersion(pkgInfo.version)
    .addTag(pkgInfo.author)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}
