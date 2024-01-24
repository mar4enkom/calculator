import {createServerRouterConfig} from "./utils";
import {Endpoints} from "@calculator/common";
import {calculatorController} from "@/calculate/controller/CalculatorController";
import {configController} from "@/config/controller/ConfigController";
import {calculationHistoryController} from "@/history/controller/CalculationHistoryController";
import {usersController} from "@/users/controller/UsersController";

export const serverRouterConfig = createServerRouterConfig({
    [Endpoints.CALCULATE]: {
        callback: calculatorController.calculateExpression
    },
    [Endpoints.CONFIG_GET]: {
        callback: configController.getUserConfig,
    },
    [Endpoints.HISTORY_GET]: {
        callback: calculationHistoryController.getHistory,
    },
    [Endpoints.HISTORY_ADD]: {
        callback: calculationHistoryController.addHistory,
    },
    [Endpoints.USERS_GET]: {
        callback: usersController.findUser
    },
    [Endpoints.USERS_ADD]: {
        callback: usersController.addUser
    }
});
