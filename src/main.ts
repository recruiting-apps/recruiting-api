import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api/v1')

  app.enableVersioning({
    type: VersioningType.URI
  })

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: 'GET,HEAD,PATCH,POST,DELETE,OPTIONS'
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    })
  )

  const config = new DocumentBuilder()
    .setTitle('Recruiting App')
    .setDescription('REST API made with NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  const PORT = Number(process.env.PORT) ?? 3000
  await app.listen(PORT)
}

void bootstrap()
