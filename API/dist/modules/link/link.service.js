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
exports.LinkService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const link_entity_1 = require("./entities/link.entity");
const typeorm_2 = require("@nestjs/typeorm");
const utils_js_1 = require("../../utils.js");
const user_service_1 = require("../user/user.service");
let LinkService = class LinkService {
    linkRepository;
    userService;
    constructor(linkRepository, userService) {
        this.linkRepository = linkRepository;
        this.userService = userService;
    }
    async getLinks(email) {
        try {
            const links = await this.linkRepository.find({
                where: { user: { email } },
            });
            if (links.length === 0)
                return utils_js_1.Result.failure('Links not found!');
            return utils_js_1.Result.success(links);
        }
        catch (e) {
            return utils_js_1.Result.failure(e);
        }
    }
    async getLink(id) {
        try {
            const link = await this.linkRepository.findOne({ where: { id } });
            if (!link) {
                return utils_js_1.Result.failure(`Link #${id} not found`);
            }
            return utils_js_1.Result.success(link);
        }
        catch (error) {
            return utils_js_1.Result.failure(error);
        }
    }
    async getLinkByCode(code) {
        try {
            const link = await this.linkRepository.findOne({ where: { code } });
            if (!link) {
                return utils_js_1.Result.failure(`The link with the code ${code} is not found!`);
            }
            return utils_js_1.Result.success(link);
        }
        catch (error) {
            return utils_js_1.Result.failure(error);
        }
    }
    async createLink(linkData) {
        try {
            let { originalLink, code } = linkData;
            const { email } = linkData;
            if (!originalLink.startsWith('http'))
                originalLink = 'https://' + originalLink;
            let generatedCode;
            if (code.length === 0) {
                generatedCode = (0, utils_js_1.generateCode)(5);
                let linkResult = await this.getLinkByCode(generatedCode);
                while (linkResult.isSuccess) {
                    generatedCode = (0, utils_js_1.generateCode)(5);
                    linkResult = await this.getLinkByCode(generatedCode);
                }
                code = generatedCode;
            }
            const userResult = await this.userService.findByEmail(email);
            return await userResult.fold(async (user) => {
                await this.linkRepository.save({ originalLink, code, user });
                return utils_js_1.Result.success({ originalLink, code });
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
    async updateLink(id, { code, originalLink }) {
        try {
            const linkToUpdate = await this.linkRepository.findOne({ where: { id } });
            if (!linkToUpdate)
                return utils_js_1.Result.failure('Link not found');
            await this.linkRepository.update(id, {
                originalLink,
                code,
            });
            const linkUpdated = await this.linkRepository.findOne({ where: { id } });
            if (!linkUpdated) {
                return utils_js_1.Result.failure('Updated link could not be retrieved');
            }
            return utils_js_1.Result.success({
                originalLink: linkUpdated.originalLink,
                code: linkUpdated.code,
            });
        }
        catch (error) {
            return utils_js_1.Result.failure(error);
        }
    }
    async removeLink(code) {
        console.log('Attempting to delete link with code:', code);
        try {
            const link = await this.linkRepository.findOne({
                where: { code },
            });
            console.log('Link found for deletion:', link);
            if (!link)
                throw new common_1.NotFoundException('Link not found');
            await this.linkRepository.delete({ code });
            const deletedLink = await this.linkRepository.findOne({
                where: { code },
            });
            console.log('Verifying deletion, link found:', deletedLink);
            if (!deletedLink)
                return utils_js_1.Result.success('Link deleted successfully');
            return utils_js_1.Result.failure('Error occurred while deleting link');
        }
        catch (error) {
            return utils_js_1.Result.failure(error);
        }
    }
    async incrementClicks(link) {
        link.clicks += 1;
        await this.linkRepository.save(link);
    }
};
exports.LinkService = LinkService;
exports.LinkService = LinkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(link_entity_1.Link)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        user_service_1.UserService])
], LinkService);
//# sourceMappingURL=link.service.js.map