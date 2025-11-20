import { Controller, Get, Param, Redirect, Res } from '@nestjs/common';
import type { Response } from 'express';
import { LinkService } from './modules/link/link.service';

@Controller()
export class AppController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  getApp(@Res() res: Response): void {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(302, clientUrl);
  }

  @Get('r/:code')
  @Redirect()
  async redirectToOriginalLink(@Param('code') code: string) {
    const result = await this.linkService.getLinkByCode(code);
    return result.fold(
      async (link) => {
        await this.linkService.incrementClicks(link);
        return { url: link.originalLink, statusCode: 302 };
      },
      () => {
        return Promise.resolve({
          url: `${process.env.CLIENT_URL}?error=link-not-found`,
          statusCode: 302,
        });
      },
    );
  }
}
