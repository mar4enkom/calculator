import express from 'express';
import {PORT} from "./config/constants";
import {calculateExpressionRoutes} from "./calculateExpression/routes";

const app = express();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(calculateExpressionRoutes);
