import {RestResponse} from "../types/express";
import {ServerErrors} from "../constants/serverErrors";
import {ApiFailResponse, ApiSuccessResponse, ErrorBody} from "@calculator/common";
import {HttpStatusCodes} from "../constants/httpStatusCodes";

export function sendSuccessResponse(res: RestResponse<any>, data: unknown): void {
    const responseBody: ApiSuccessResponse<any> = {
        data,
        success: true
    };

    res.status(HttpStatusCodes.OK).json(responseBody);
}

export function sendErrorResponse(errors: ErrorBody, status: HttpStatusCodes, res: RestResponse<any>): void {
    const responseBody: ApiFailResponse<any> = {
        errors,
        success: false
    };
    res.status(status).json(responseBody);
}

export function sendInternalServerErrorResponse(res: RestResponse<any>): void {
    const responseBody: ApiFailResponse<any> = {
        errors: [ServerErrors.UNKNOWN_SERVER_ERROR],
        success: false
    };
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(responseBody)
}