import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLinkDto, UpdateLinkDto } from './dto';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { generateCode, Result } from 'src/utils';
import { LinkData, LinkError } from './types';
import { UserService } from '../user/user.service';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private readonly linkRepository: Repository<Link>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
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
      const { email } = linkData;

      if (!originalLink.startsWith('http'))
        originalLink = 'https://' + originalLink;

      let generatedCode: string;
      if (code.length === 0) {
        generatedCode = generateCode(10);
        let linkResult = await this.getLinkByCode(generatedCode);
        while (linkResult.isFailure) {
          generatedCode = generateCode(10);
          linkResult = await this.getLinkByCode(generatedCode);
        }
        code = generatedCode;
      }
      const userResult = await this.userService.findByEmail(email);
      return await userResult.fold(
        async (user) => {
          await this.linkRepository.save({ originalLink, code, user });
          const addLinkToUserResult = await this.userService.addLinkToUser(
            email,
            code,
          );
          return addLinkToUserResult.fold(
            (link) => {
              return Result.success({
                originalLink: link.originalLink,
                code: link.code,
              });
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (error) => {
              return Result.failure<LinkData, LinkError>(
                "Error while adding link to user's links",
              );
            },
          );
        },
        // eslint-disable-next-line @typescript-eslint/require-await
        async (error) => {
          if (typeof error === 'string')
            return Result.failure<LinkData, LinkError>(error);
          return Result.failure<LinkData, LinkError>(error);
        },
      );
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

  async incrementClicks(link: Link): Promise<void> {
    link.clicks += 1;
    await this.linkRepository.save(link);
  }
}
