import express from 'express';
import {initStore} from "./calculateExpression/CalculatorService/helpers/init/initStore";
import {operationsConfig} from "@calculator/common";
import {PORT} from "./config/constants";
import {calculateExpressionRoutes} from "./calculateExpression/routes";

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

initStore({userConfig: operationsConfig});

app.use(calculateExpressionRoutes);
