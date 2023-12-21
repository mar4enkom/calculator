import express from "express";
import {Endpoints} from "@calculator/common";
import {calculateExpression} from "./calculatorController";

const calculateExpressionRoutes = express.Router();

calculateExpressionRoutes.post(Endpoints.CALCULATE, calculateExpression);

export {
    calculateExpressionRoutes
}