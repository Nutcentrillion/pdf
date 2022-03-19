import { Module } from '@nestjs/common';
import { PDFModule, PDFModuleOptions } from '@t00nday/nestjs-pdf';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PDFModule.registerAsync({
      useFactory: (): PDFModuleOptions => ({
        view: {
          root: './src/assets',
          engine: 'pug',
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
