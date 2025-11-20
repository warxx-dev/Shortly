import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserData: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(email: string): Promise<import("./entities/user.entity").User>;
    update(email: string, updateUserData: UpdateUserDto): Promise<import("./entities/user.entity").User>;
    remove(email: string): Promise<string>;
}
