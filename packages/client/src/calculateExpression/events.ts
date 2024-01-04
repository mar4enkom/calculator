import {AppEvent} from "../shared/createEvent/AppEvent";
import {CalculateExpressionPayload} from "@calculator/common";

export const onCalculateExpression = new AppEvent<CalculateExpressionPayload>();