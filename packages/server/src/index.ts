import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import {PORT} from "./config/constants";
import {calculateExpressionRoutes} from "./calculateExpression/routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(calculateExpressionRoutes);
