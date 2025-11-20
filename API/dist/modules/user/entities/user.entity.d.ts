import { Link } from '../../link/entities/link.entity';
export declare class User {
    email: string;
    password: string;
    name: string;
    picture: string;
    links: Link[];
    createdAt: Date;
    updatedAt: Date;
}
