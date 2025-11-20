import express from 'express';
declare const server: import("express-serve-static-core").Express;
export declare const createNestServer: (expressInstance: express.Express) => Promise<import("@nestjs/common").INestApplication<any>>;
export default server;
