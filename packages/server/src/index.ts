import express from 'express';
import {calculateExpression} from "./calculatorController";

const app = express();
const port = 8000;

app.get('/calculate', calculateExpression);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
