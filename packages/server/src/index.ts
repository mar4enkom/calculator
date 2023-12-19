import express from 'express';
import {calculateExpression} from "./calculatorController";
import {initStore} from "./CalculatorService/helpers/init/initStore";
import {Endpoints, operationsConfig} from "@calculator/common";

const app = express();
const port = 8000;

initStore({userConfig: operationsConfig});

app.get(Endpoints.CALCULATE, calculateExpression);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
