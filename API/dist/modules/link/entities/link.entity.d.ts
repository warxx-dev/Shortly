import { User } from '../../user/entities/user.entity';
export declare class Link {
    id: number;
    originalLink: string;
    code: string;
    clicks: number;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
