import express, {NextFunction} from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import {PORT} from "./config/constants";
import {calculateExpressionRoutes} from "./components/calculateExpression/routes";
import {RestRequest, RestResponse} from "./shared/types/express";
import {sendErrorResponse} from "./shared/utils/sendResponse";
import {AppError} from "./shared/errors/types";
import {getErrorBody} from "./shared/errors/utils/utils";
import ErrorHandler from "./shared/errors/ErrorHandler";
import {ServerErrors} from "./shared/constants/serverErrors";
import {HttpStatusCodes} from "./shared/constants/httpStatusCodes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(calculateExpressionRoutes);

app.use(async (error: AppError, req: RestRequest, res: RestResponse<any>, next: NextFunction): Promise<void> => {
    const errorBody = getErrorBody(error);
    sendErrorResponse(errorBody, error.httpCode, res);

    await ErrorHandler.handleError(error);
});

app.use((req: RestRequest, res: RestResponse<any>): void => {
    sendErrorResponse([ServerErrors.INVALID_PATH], HttpStatusCodes.NOT_FOUND, res);
});
