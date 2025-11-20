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
exports.LinkController = void 0;
const common_1 = require("@nestjs/common");
const link_service_1 = require("./link.service");
const dto_1 = require("./dto");
let LinkController = class LinkController {
    linkService;
    constructor(linkService) {
        this.linkService = linkService;
    }
    async find(email) {
        console.log('Received find links request with email:', email);
        const result = await this.linkService.getLinks(email);
        return result.fold((links) => {
            console.log('Retrieved links:', links);
            return links;
        }, (error) => {
            if (typeof error === 'string') {
                if (error.includes('not found')) {
                    throw new common_1.NotFoundException(error);
                }
                throw new common_1.InternalServerErrorException(error);
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException('Error retrieving links due to a system failure.');
            }
            throw new common_1.InternalServerErrorException('An unknown error occurred.');
        });
    }
    async findByCode(code) {
        const result = await this.linkService.getLinkByCode(code);
        return result.fold((link) => link, (error) => {
            if (typeof error === 'string') {
                if (error.includes('not found')) {
                    throw new common_1.NotFoundException(error);
                }
                throw new common_1.InternalServerErrorException(error);
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException('Error retrieving link due to a system failure.');
            }
            throw new common_1.InternalServerErrorException('An unknown error occurred.');
        });
    }
    async findOne(id) {
        const result = await this.linkService.getLink(id);
        return result.fold((link) => link, (error) => {
            if (typeof error === 'string') {
                if (error.includes('not found')) {
                    throw new common_1.NotFoundException(error);
                }
                throw new common_1.InternalServerErrorException(error);
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException('Error retrieving link due to a system failure.');
            }
            throw new common_1.InternalServerErrorException('An unknown error occurred.');
        });
    }
    async create(body) {
        console.log('Received create link request with body:', body);
        const { originalLink, code, email } = body;
        const result = await this.linkService.createLink({
            originalLink,
            code,
            email,
        });
        return result.fold((link) => {
            console.log('Link created successfully:', link);
            return link;
        }, (error) => {
            console.log('Error creating link:', error);
            if (typeof error === 'string') {
                if (error.includes('not found')) {
                    throw new common_1.NotFoundException(error);
                }
                throw new common_1.InternalServerErrorException(error);
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException('Error creating link due to a system failure.');
            }
            throw new common_1.InternalServerErrorException('An unknown error occurred.');
        });
    }
    async update(id, body) {
        const { code, originalLink } = body;
        const result = await this.linkService.updateLink(id, {
            code,
            originalLink,
        });
        return result.fold((link) => link, (error) => {
            if (typeof error === 'string') {
                if (error.includes('not found')) {
                    throw new common_1.NotFoundException(error);
                }
                throw new common_1.InternalServerErrorException(error);
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException('Error updating link due to a system failure.');
            }
            throw new common_1.InternalServerErrorException('An unknown error occurred.');
        });
    }
    async remove(code) {
        const result = await this.linkService.removeLink(code);
        return result.fold((link) => link, (error) => {
            if (typeof error === 'string') {
                if (error.includes('not found')) {
                    throw new common_1.NotFoundException(error);
                }
                throw new common_1.InternalServerErrorException(error);
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException('Error deleting link due to a system failure.');
            }
            throw new common_1.InternalServerErrorException('An unknown error occurred.');
        });
    }
};
exports.LinkController = LinkController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "find", null);
__decorate([
    (0, common_1.Get)('code/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "findByCode", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateLinkDto]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.UpdateLinkDto]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "remove", null);
exports.LinkController = LinkController = __decorate([
    (0, common_1.Controller)('link'),
    __metadata("design:paramtypes", [link_service_1.LinkService])
], LinkController);
//# sourceMappingURL=link.controller.js.map