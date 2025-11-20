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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserData) {
        const result = await this.userService.create(createUserData);
        return result.fold((user) => user, (error) => {
            if (typeof error === 'string') {
                if (error.includes('not found')) {
                    throw new common_1.NotFoundException(error);
                }
                throw new common_1.InternalServerErrorException(error);
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException('Error creating user due to a system failure.');
            }
            throw new common_1.InternalServerErrorException('An unknown error occurred.');
        });
    }
    async findAll() {
        const result = await this.userService.findAll();
        return result.fold((users) => users, (error) => {
            if (typeof error === 'string') {
                if (error.includes('not found')) {
                    throw new common_1.NotFoundException(error);
                }
                throw new common_1.InternalServerErrorException(error);
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException('Error retrieving users due to a system failure.');
            }
            throw new common_1.InternalServerErrorException('An unknown error occurred.');
        });
    }
    async findOne(email) {
        const result = await this.userService.findByEmail(email);
        return result.fold((user) => user, (error) => {
            if (typeof error === 'string') {
                if (error.includes('not found')) {
                    throw new common_1.NotFoundException(error);
                }
                throw new common_1.InternalServerErrorException(error);
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException('Error retrieving user due to a system failure.');
            }
            throw new common_1.InternalServerErrorException('An unknown error occurred.');
        });
    }
    async update(email, updateUserData) {
        const result = await this.userService.update(email, updateUserData);
        return result.fold((user) => user, (error) => {
            if (typeof error === 'string') {
                if (error.includes('not found')) {
                    throw new common_1.NotFoundException(error);
                }
                throw new common_1.InternalServerErrorException(error);
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException('Error updating user due to a system failure.');
            }
            throw new common_1.InternalServerErrorException('An unknown error occurred.');
        });
    }
    async remove(email) {
        const result = await this.userService.remove(email);
        return result.fold((message) => message, (error) => {
            if (typeof error === 'string') {
                if (error.includes('not found')) {
                    throw new common_1.NotFoundException(error);
                }
                throw new common_1.InternalServerErrorException(error);
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException('Error deleting user due to a system failure.');
            }
            throw new common_1.InternalServerErrorException('An unknown error occurred.');
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map