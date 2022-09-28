import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { pkgInfo } from '@/shared/utils';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@/config';

export function setupSwagger(app: INestApplication) {
  const config = ConfigModule.getConfig();
  if (!config.isProduction) {
    const options = new DocumentBuilder()
      .setTitle(pkgInfo.name)
      .setDescription(pkgInfo.description)
      .setVersion(pkgInfo.version)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }
}
