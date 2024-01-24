import express from 'express';
import 'dotenv/config'
import {PORT} from "./config/constants";
import {handleUncaughtException, handleUnhandledRejection} from "./shared/utils/processHandlers";
import {basicMiddlewareList} from "./middleware/basicMiddlewareList";
import {errorMiddlewareList} from "./middleware/errorMiddlewareList";
import {serverRouter} from "./router/globalRouter/serverRouter";

const app = express();

app.use(...basicMiddlewareList);
app.use(serverRouter);
app.use(...errorMiddlewareList)

process.on("uncaughtException", handleUncaughtException);
process.on("unhandledRejection", handleUnhandledRejection);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
