import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import {PORT} from "./config/constants";
import {calculateExpressionRoutes} from "./components/calculateExpression/routes";
import {errorHandlingMiddleware} from "./middleware/errorHandlingMiddleware";
import {notFoundMiddleware} from "./middleware/notFoundMiddleware";
import {handleUncaughtException, handleUnhandledRejection} from "./shared/utils/processHandlers";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(calculateExpressionRoutes);

app.use(errorHandlingMiddleware);
app.use(notFoundMiddleware);

process.on("uncaughtException", handleUncaughtException);
process.on("unhandledRejection", handleUnhandledRejection);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
