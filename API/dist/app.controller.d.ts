import type { Response } from 'express';
import { LinkService } from './modules/link/link.service';
export declare class AppController {
    private readonly linkService;
    constructor(linkService: LinkService);
    getApp(res: Response): void;
    redirectToOriginalLink(code: string): Promise<{
        url: string;
        statusCode: number;
    }>;
}
