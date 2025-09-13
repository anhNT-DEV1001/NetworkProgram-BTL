import { DocumentBuilder } from '@nestjs/swagger';
export const swaggerConfig = new DocumentBuilder()
    .setTitle('TaskManager Backend')
    .setDescription('APIs Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
