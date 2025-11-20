import { LinkService } from './link.service';
import { CreateLinkDto, UpdateLinkDto } from './dto';
import { Link } from './entities/link.entity';
import { LinkData } from './types';
export declare class LinkController {
    private readonly linkService;
    constructor(linkService: LinkService);
    find(email: string): Promise<Link[]>;
    findByCode(code: string): Promise<Link>;
    findOne(id: number): Promise<Link>;
    create(body: CreateLinkDto): Promise<LinkData>;
    update(id: number, body: UpdateLinkDto): Promise<LinkData>;
    remove(code: string): Promise<string>;
}
