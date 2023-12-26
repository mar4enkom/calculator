import express from "express";
import {Endpoints} from "@calculator/common";
import CalculatorController from "./CalculatorController";

const calculateExpressionRoutes = express.Router();

calculateExpressionRoutes.post(Endpoints.CALCULATE, CalculatorController.calculateExpression);

export {
    calculateExpressionRoutes
}