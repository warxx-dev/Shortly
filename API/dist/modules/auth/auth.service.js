"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const google_auth_library_1 = require("google-auth-library");
const bcrypt = __importStar(require("bcryptjs"));
const utils_1 = require("../../utils");
let AuthService = class AuthService {
    constructor(jwtService, userService, userRepository) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }
    async validateUser(email, pass) {
        const result = await this.userService.findByEmail(email);
        console.log(`Validating user: ${email}`);
        console.log(`Password received: "${pass}"`);
        if (result.isSuccess) {
            const user = result.getData();
            console.log(`User found:`, user);
            if (user && user.password) {
                console.log(`Stored hash: ${user.password}`);
                const isPasswordValid = await bcrypt.compare(pass, user.password);
                console.log(`Password valid: ${isPasswordValid}`);
                if (isPasswordValid) {
                    const { password, ...restData } = user;
                    console.log(`User ${email} validated successfully`);
                    return restData;
                }
            }
        }
        return null;
    }
    login(user) {
        const payload = { email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(resgisterData) {
        try {
            const { email, password, name } = resgisterData;
            console.log('Register - Raw password received:', `"${password}"`);
            console.log('Register - Password length:', password.length);
            const existingUser = await this.userRepository.findOne({
                where: { email },
            });
            if (existingUser) {
                return utils_1.Result.failure('User with this email already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Register - Hashed password:', hashedPassword);
            const result = await this.userService.create({
                email: email,
                password: hashedPassword,
                name: name,
            });
            return result.fold((user) => {
                const payload = {
                    email: user.email,
                };
                return utils_1.Result.success({
                    access_token: this.jwtService.sign(payload),
                    user: user,
                });
            }, (error) => {
                return utils_1.Result.failure(error);
            });
        }
        catch (error) {
            return utils_1.Result.failure(error);
        }
    }
    async google(googleLoginDto) {
        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken: googleLoginDto.token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload) {
                return utils_1.Result.failure('Invalid Google token');
            }
            const { email, name, picture } = payload;
            let user = await this.userRepository.findOne({
                where: { email },
            });
            if (!user) {
                user = this.userRepository.create({
                    email,
                    name,
                    picture,
                });
                await this.userRepository.save(user);
            }
            else {
                if (!user.picture && picture) {
                    await this.userService.update(email, { picture });
                }
            }
            const jwtPayload = { email: user.email };
            const accessToken = this.login(jwtPayload);
            return utils_1.Result.success({
                access_token: accessToken.access_token,
                user,
            });
        }
        catch (e) {
            return utils_1.Result.failure(e);
        }
    }
    async validateToken(token) {
        try {
            const decoded = this.jwtService.verify(token);
            const result = await this.userService.findByEmail(decoded.email);
            return result.fold((user) => utils_1.Result.success(user), (error) => utils_1.Result.failure(error));
        }
        catch (e) {
            return utils_1.Result.failure(e);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map