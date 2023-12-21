import {RestResponse} from "../types/express";
import {ServerErrors} from "../constants/serverErrors";
import {CustomErrorType} from "@calculator/common";

export function sendSuccessResponse(res: RestResponse<any>, data: unknown): void {
    res.status(200).json({
        data,
        success: true
    });
}

export function sendErrorResponse(res: RestResponse<any>, errors: CustomErrorType[], status: number): void {
    res.status(status).json({
        errors,
        success: false
    });
}

export function sendInternalServerErrorResponse(res: RestResponse<any>): void {
    res.status(500).json({
        success: false,
        errors: [ServerErrors.UNKNOWN_SERVER_ERROR]
    })
}