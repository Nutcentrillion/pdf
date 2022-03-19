import { Injectable } from '@nestjs/common';
import { PDFOptions, PDFService } from '@t00nday/nestjs-pdf';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class AppService {
  constructor(private readonly pdfService: PDFService) {}

  getHello(): string {
    return 'Hello World!';
  }

  generatePDFToFile(template: string, filename?: string, options?: PDFOptions) {
    const test = this.pdfService.toFile(template, filename, options);

    console.log(test);

    return test;
  }

  generatePDFToStream(template: string, options?: PDFOptions) {
    this.pdfService.toStream(template, options); // returns Observable<Readable>;
  }

  async generatePDFToBuffer(template: string, options?: PDFOptions) {
    return await this.pdfService.toBuffer(template, options).toPromise();
  }

  async generatePDF(): Promise<Buffer> {
    const pdfBuffer: Buffer = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        bufferPages: true,
      });

      // customize your PDF document
      doc.text('hello world', 100, 50);
      doc.end();

      const buffer = [];
      doc.on('data', buffer.push.bind(buffer));
      doc.on('end', () => {
        const data = Buffer.concat(buffer);
        resolve(data);
      });
    });

    return pdfBuffer;
  }
}
