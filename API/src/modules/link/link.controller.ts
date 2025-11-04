import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto, UpdateLinkDto } from './dto';
import { Link } from './entities/link.entity';
import { UpdateResult } from 'typeorm';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  async find(): Promise<Link[]> {
    return this.linkService.getLinks();
  }

  @Get('code/:code')
  async findByCode(@Param('code') code: string): Promise<Link | null> {
    return this.linkService.getLinkByCode(code);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Link> {
    return this.linkService.getLink(id);
  }

  @Post()
  async create(@Body() body: CreateLinkDto): Promise<Link> {
    const { originalLink, code } = body;
    console.log(body);
    return this.linkService.createLink({ originalLink, code });
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() body: UpdateLinkDto,
  ): Promise<UpdateResult> {
    const { code, originalLink } = body;
    return this.linkService.updateLink(id, { code, originalLink });
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.linkService.removeLink(id);
  }
}
