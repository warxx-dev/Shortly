import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto, UpdateLinkDto } from './dto';
import { Link } from './entities/link.entity';
import { LinkData } from './types';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  async find(): Promise<Link[] | { error: string }> {
    const result = await this.linkService.getLinks();
    return result.fold(
      (links) => links,
      (error) => {
        if (typeof error === 'string') {
          if (error.includes('not found')) {
            throw new NotFoundException(error);
          }
          throw new InternalServerErrorException(error);
        }

        if (error instanceof Error) {
          throw new InternalServerErrorException(
            'Error retrieving links due to a system failure.',
          );
        }

        throw new InternalServerErrorException('An unknown error occurred.');
      },
    );
  }

  @Get('code/:code')
  async findByCode(@Param('code') code: string): Promise<Link> {
    const result = await this.linkService.getLinkByCode(code);
    return result.fold(
      (link) => link,
      (error) => {
        if (typeof error === 'string') {
          if (error.includes('not found')) {
            throw new NotFoundException(error);
          }
          throw new InternalServerErrorException(error);
        }

        if (error instanceof Error) {
          throw new InternalServerErrorException(
            'Error retrieving link due to a system failure.',
          );
        }

        throw new InternalServerErrorException('An unknown error occurred.');
      },
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Link> {
    const result = await this.linkService.getLink(id);
    return result.fold(
      (link) => link,
      (error) => {
        if (typeof error === 'string') {
          if (error.includes('not found')) {
            throw new NotFoundException(error);
          }
          throw new InternalServerErrorException(error);
        }

        if (error instanceof Error) {
          throw new InternalServerErrorException(
            'Error retrieving link due to a system failure.',
          );
        }

        throw new InternalServerErrorException('An unknown error occurred.');
      },
    );
  }

  @Post()
  async create(@Body() body: CreateLinkDto): Promise<LinkData> {
    const { originalLink, code, email } = body;
    const result = await this.linkService.createLink({
      originalLink,
      code,
      email,
    });
    return result.fold(
      (link) => link,
      (error) => {
        if (typeof error === 'string') {
          if (error.includes('not found')) {
            throw new NotFoundException(error);
          }
          throw new InternalServerErrorException(error);
        }

        if (error instanceof Error) {
          throw new InternalServerErrorException(
            'Error creating link due to a system failure.',
          );
        }

        throw new InternalServerErrorException('An unknown error occurred.');
      },
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateLinkDto,
  ): Promise<LinkData> {
    const { code, originalLink } = body;
    const result = await this.linkService.updateLink(id, {
      code,
      originalLink,
    });
    return result.fold(
      (link) => link,
      (error) => {
        if (typeof error === 'string') {
          if (error.includes('not found')) {
            throw new NotFoundException(error);
          }
          throw new InternalServerErrorException(error);
        }

        if (error instanceof Error) {
          throw new InternalServerErrorException(
            'Error updating link due to a system failure.',
          );
        }

        throw new InternalServerErrorException('An unknown error occurred.');
      },
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<string> {
    const result = await this.linkService.removeLink(id);
    return result.fold(
      (link) => link,
      (error) => {
        if (typeof error === 'string') {
          if (error.includes('not found')) {
            throw new NotFoundException(error);
          }
          throw new InternalServerErrorException(error);
        }

        if (error instanceof Error) {
          throw new InternalServerErrorException(
            'Error deleting link due to a system failure.',
          );
        }

        throw new InternalServerErrorException('An unknown error occurred.');
      },
    );
  }
}
