import { Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { type ConfigType } from '@nestjs/config';
interface JwtPayload {
    sub: number;
    email: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private jwtConfiguration;
    constructor(jwtConfiguration: ConfigType<typeof jwtConfig>);
    validate(payload: JwtPayload): {
        email: string;
    };
}
export {};
