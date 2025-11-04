import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto, UpdateLinkDto } from './dto';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm/browser';
import { generateCode } from 'src/utils';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private readonly linkRepository: Repository<Link>,
  ) {}

  async getLinks(): Promise<Link[]> {
    try {
      return await this.linkRepository.find();
    } catch (error) {
      console.error('Error fetching links:', error);
      throw error;
    }
  }
  async getLink(id: number): Promise<Link> {
    const link = await this.linkRepository.findOne({ where: { id } });

    if (!link) {
      throw new NotFoundException('Link not found');
    }
    return link;
  }

  async getLinkByCode(code: string): Promise<Link | null> {
    console.log(code);
    const link = await this.linkRepository.findOne({ where: { code } });
    console.log(!link);
    if (!link) {
      return null;
    }
    return link;
  }

  async createLink(link: CreateLinkDto) {
    let { originalLink } = link;
    const { code } = link;

    if (!originalLink.startsWith('http'))
      originalLink = 'https://' + originalLink;

    let generatedCode: string;
    if (code.length == 0) {
      generatedCode = generateCode(10);
      let existingLink = await this.getLinkByCode(generatedCode);
      console.log('Existing Link', existingLink);
      while (existingLink) {
        generatedCode = generateCode(10);
        existingLink = await this.getLinkByCode(generatedCode);
      }
      console.log('return ', { originalLink, code: generatedCode });
      return this.linkRepository.save({ originalLink, code: generatedCode });
    }

    return this.linkRepository.save({ originalLink, code });
  }

  async updateLink(
    id: number,
    { code, originalLink }: UpdateLinkDto,
  ): Promise<UpdateResult> {
    const linkToUpdate = await this.linkRepository.update(id, {
      originalLink,
      code,
    });

    if (!linkToUpdate) throw new NotFoundException('Link not found');

    return linkToUpdate;
  }

  async removeLink(id: number): Promise<void> {
    const link: Link | null = await this.linkRepository.findOne({
      where: { id },
    });

    if (!link) throw new NotFoundException('Link not found');

    await this.linkRepository.delete(link);
  }
}
