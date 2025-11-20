"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const utils_js_1 = require("../../utils.js");
const link_service_1 = require("../link/link.service");
let UserService = class UserService {
    userRepository;
    linkService;
    constructor(userRepository, linkService) {
        this.userRepository = userRepository;
        this.linkService = linkService;
    }
    async create({ name, email, password, }) {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { email },
            });
            if (existingUser)
                return utils_js_1.Result.failure('User with this email already exists');
            const newUser = this.userRepository.create({
                name: name,
                email: email,
                password: password,
            });
            await this.userRepository.save(newUser);
            return utils_js_1.Result.success(newUser);
        }
        catch (error) {
            return utils_js_1.Result.failure(error);
        }
    }
    async findAll() {
        try {
            const users = await this.userRepository.find();
            if (users.length === 0)
                return utils_js_1.Result.failure('Users not found');
            return utils_js_1.Result.success(users);
        }
        catch (error) {
            return utils_js_1.Result.failure(error);
        }
    }
    async findByEmail(email) {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                return utils_js_1.Result.failure(`User with email ${email} not found`);
            }
            return utils_js_1.Result.success(user);
        }
        catch (error) {
            return utils_js_1.Result.failure(error);
        }
    }
    async addLinkToUser(email, code) {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                return utils_js_1.Result.failure(`User with email ${email} not found`);
            }
            const linkResult = await this.linkService.getLinkByCode(code);
            return linkResult.fold(async (link) => {
                user.links.push(link);
                await this.userRepository.save(user);
                return utils_js_1.Result.success(link);
            }, async (error) => {
                if (typeof error === 'string')
                    return utils_js_1.Result.failure(error);
                return utils_js_1.Result.failure(error);
            });
        }
        catch (error) {
            return utils_js_1.Result.failure(error);
        }
    }
    async update(email, updateData) {
        try {
            const userToUpdate = await this.userRepository.findOne({
                where: { email },
            });
            if (!userToUpdate) {
                return utils_js_1.Result.failure(`User with email ${email} not found`);
            }
            await this.userRepository.update(email, updateData);
            const userUpdated = await this.userRepository.findOne({
                where: { email },
            });
            if (!userUpdated) {
                return utils_js_1.Result.failure('Updated user could not be retrieved');
            }
            return utils_js_1.Result.success(userUpdated);
        }
        catch (error) {
            return utils_js_1.Result.failure(error);
        }
    }
    async remove(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return utils_js_1.Result.failure(`User with email ${email} not found`);
        }
        await this.userRepository.delete(email);
        const deletedUser = await this.userRepository.findOne({ where: { email } });
        if (deletedUser)
            return utils_js_1.Result.failure('Error ocurred while deleting user');
        return utils_js_1.Result.success('User deleted successfully');
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => link_service_1.LinkService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        link_service_1.LinkService])
], UserService);
//# sourceMappingURL=user.service.js.map