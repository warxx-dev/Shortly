"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = LoggerMiddleware;
function LoggerMiddleware(req, res, next) {
    console.log(`Method: ${req.method}, body: ${req.body}`);
    res.json({ ...req.body });
    next();
}
//# sourceMappingURL=logger.middleware.js.map