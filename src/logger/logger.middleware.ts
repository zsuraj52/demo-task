import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const statusCode = res.statusCode;
      const duration = Date.now() - start;
      const success = statusCode >= 200 && statusCode < 300;
      const statusText = success ? 'SUCCESS' : 'FAILURE';
      this.logger.log(
        `${method}  ${originalUrl} ${statusCode} ${duration} ms ${statusText}\n`,
      );
    });

    next();
  }
}
