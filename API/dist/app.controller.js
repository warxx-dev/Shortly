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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const link_service_1 = require("./modules/link/link.service");
let AppController = class AppController {
    linkService;
    constructor(linkService) {
        this.linkService = linkService;
    }
    getApp() { }
    async redirectToOriginalLink(code) {
        const result = await this.linkService.getLinkByCode(code);
        return result.fold(async (link) => {
            await this.linkService.incrementClicks(link);
            return { url: link.originalLink, statusCode: 302 };
        }, () => {
            return Promise.resolve({
                url: `${process.env.CLIENT_URL}?error=link-not-found`,
                statusCode: 302,
            });
        });
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Redirect)(process.env.CLIENT_URL, 302),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getApp", null);
__decorate([
    (0, common_1.Get)('r/:code'),
    (0, common_1.Redirect)(),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "redirectToOriginalLink", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [link_service_1.LinkService])
], AppController);
//# sourceMappingURL=app.controller.js.map