import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { LinkService } from './modules/link/link.service';

@Controller()
export class AppController {
  constructor(private readonly linkService: LinkService) {}
  @Get()
  @Redirect('http://localhost:5173', 301)
  getApp(): void {}

  @Get('/:code')
  @Redirect()
  async redirectToOriginalLink(@Param('code') code: string) {
    console.log(code);
    const link = await this.linkService.getLinkByCode(code);
    if (link) {
      return { url: link.originalLink, statusCode: 302 };
    }
    return {};
  }
}
