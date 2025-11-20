import { CreateLinkDto, UpdateLinkDto } from './dto';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { Result } from '../../utils';
import { LinkData, LinkError } from './types';
import { UserService } from '../user/user.service';
export declare class LinkService {
    private readonly linkRepository;
    private readonly userService;
    constructor(linkRepository: Repository<Link>, userService: UserService);
    getLinks(email: string): Promise<Result<Link[], LinkError>>;
    getLink(id: number): Promise<Result<Link, LinkError>>;
    getLinkByCode(code: string): Promise<Result<Link, LinkError>>;
    createLink(linkData: CreateLinkDto): Promise<Result<LinkData, LinkError>>;
    updateLink(id: number, { code, originalLink }: UpdateLinkDto): Promise<Result<LinkData, LinkError>>;
    removeLink(code: string): Promise<Result<string, LinkError>>;
    incrementClicks(link: Link): Promise<void>;
}
