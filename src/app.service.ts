import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Prueba tecnica de API Moises Ochoa!!!';
  }
}
