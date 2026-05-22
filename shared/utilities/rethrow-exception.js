"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rethrowIfHttpException = rethrowIfHttpException;
const common_1 = require("@nestjs/common");
const apiResponse_1 = require("./apiResponse");
const response_comment_1 = require("../constant/response.comment");
function rethrowIfHttpException(error) {
    console.log("Occured Error: ", error);
    if (error instanceof common_1.HttpException) {
        throw error;
    }
    const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(response_comment_1.COMMENT.INTERNAL_ERROR_COMMENT);
    throw new common_1.HttpException(apiResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
}
//# sourceMappingURL=rethrow-exception.js.map