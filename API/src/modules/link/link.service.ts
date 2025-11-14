import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto, UpdateLinkDto } from './dto';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { generateCode, Result } from 'src/utils';
import { LinkData, LinkError } from './types';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private readonly linkRepository: Repository<Link>,
  ) {}

  async getLinks(): Promise<Result<Link[], LinkError>> {
    try {
      const links = await this.linkRepository.find();
      if (links.length === 0) return Result.failure('Links not found!');

      return Result.success(links);
    } catch (e) {
      return Result.failure(e as Error);
    }
  }

  async getLink(id: number): Promise<Result<Link, LinkError>> {
    try {
      const link = await this.linkRepository.findOne({ where: { id } });

      if (!link) {
        return Result.failure(`Link #${id} not found`);
      }
      return Result.success(link);
    } catch (error) {
      return Result.failure(error as Error);
    }
  }

  async getLinkByCode(code: string): Promise<Result<Link, LinkError>> {
    try {
      const link = await this.linkRepository.findOne({ where: { code } });
      if (!link) {
        return Result.failure(`The link with the code ${code} is not found!`);
      }
      return Result.success(link);
    } catch (error) {
      return Result.failure(error as Error);
    }
  }

  async createLink(
    linkData: CreateLinkDto,
  ): Promise<Result<LinkData, LinkError>> {
    try {
      let { originalLink, code } = linkData;

      if (!originalLink.startsWith('http'))
        originalLink = 'https://' + originalLink;

      let generatedCode: string;
      if (code.length === 0) {
        generatedCode = generateCode(10);
        let existingLink = await this.getLinkByCode(generatedCode);
        while (existingLink) {
          generatedCode = generateCode(10);
          existingLink = await this.getLinkByCode(generatedCode);
        }
        code = generatedCode;
      }

      await this.linkRepository.save({ originalLink, code, clicks: 0 });
      return Result.success({ originalLink, code });
    } catch (error) {
      return Result.failure(error as Error);
    }
  }

  async updateLink(
    id: number,
    { code, originalLink }: UpdateLinkDto,
  ): Promise<Result<LinkData, LinkError>> {
    try {
      const linkToUpdate = await this.linkRepository.findOne({ where: { id } });

      if (!linkToUpdate) return Result.failure('Link not found');

      await this.linkRepository.update(id, {
        originalLink,
        code,
      });

      const linkUpdated = await this.linkRepository.findOne({ where: { id } });

      if (!linkUpdated) {
        return Result.failure('Updated link could not be retrieved');
      }

      return Result.success({
        originalLink: linkUpdated.originalLink,
        code: linkUpdated.code,
      });
    } catch (error) {
      return Result.failure(error as Error);
    }
  }

  async removeLink(id: number): Promise<Result<string, LinkError>> {
    try {
      const link = await this.linkRepository.findOne({
        where: { id },
      });

      if (!link) throw new NotFoundException('Link not found');

      await this.linkRepository.delete(link);

      const deletedLink = await this.linkRepository.findOne({ where: { id } });

      if (!deletedLink) return Result.success('Link deleted successfully');

      return Result.failure('Error ocurred while deleting link');
    } catch (error) {
      return Result.failure(error as Error);
    }
  }
}
