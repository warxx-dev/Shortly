import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Result } from '../../utils';
import { UserError } from './types';
import { LinkService } from '../link/link.service';
import { Link } from '../link/entities/link.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly linkService;
    constructor(userRepository: Repository<User>, linkService: LinkService);
    create({ name, email, password, }: CreateUserDto): Promise<Result<User, UserError>>;
    findAll(): Promise<Result<User[], UserError>>;
    findByEmail(email: string): Promise<Result<User, UserError>>;
    addLinkToUser(email: string, code: string): Promise<Result<Link, UserError>>;
    update(email: string, updateData: UpdateUserDto): Promise<Result<User, UserError>>;
    remove(email: string): Promise<Result<string, UserError>>;
}
