"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
exports.generateCode = generateCode;
function generateCode(longitud = 5) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < longitud; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        codigo += caracteres[indice];
    }
    return codigo;
}
class Result {
    constructor(isSuccess, data, error) {
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.data = data;
        this.error = error;
        Object.freeze(this);
    }
    static success(data) {
        return new Result(true, data, null);
    }
    static failure(error) {
        return new Result(false, null, error);
    }
    getData() {
        return this.data;
    }
    getError() {
        return this.error;
    }
    fold(onSuccess, onFailure) {
        if (this.isSuccess) {
            return onSuccess(this.data);
        }
        return onFailure(this.error);
    }
}
exports.Result = Result;
//# sourceMappingURL=utils.js.map