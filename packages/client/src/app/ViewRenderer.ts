import {FunctionOperationList, UserConfigResponseBody} from "@calculator/common";
import {CalculatorUIKit} from "viewService/helpers/ui/CalculatorUIKit";
import {getDigitColumnItems} from "viewService/utils/getDigitColumnItems";
import {ClassNames, DomIds} from "../shared/contstants/dom";
import {AppEvents} from "./observer";

type CreateDivArgs = {
    className?: string;
    id?: string;
}

function createDiv({className, id}: CreateDivArgs): HTMLDivElement {
    const div = document.createElement("div");
    if(className) div.classList.add(className);
    if(id) div.setAttribute("id", id);
    return div;
}

const BUTTONS_PER_COLUMN = 4;

export class ViewRenderer {
    public uiKit: CalculatorUIKit;
    private appEvents: AppEvents;
    private userConfig: UserConfigResponseBody;

    constructor(appEvents: AppEvents, userConfig: UserConfigResponseBody) {
        this.appEvents = appEvents;
        this.userConfig = userConfig;
        this.uiKit = new CalculatorUIKit(this.userConfig.symbols);
    }

    createCalculator() {
        const buttonColumnsWrapper = createDiv({className: ClassNames.BUTTONS_WRAPPER})

        this.uiKit.inputElement.focus();

        buttonColumnsWrapper.appendChild(this.createFunctionsColumn());
        buttonColumnsWrapper.appendChild(this.createNumbersColumn());
        buttonColumnsWrapper.appendChild(this.createOperationsColumn());

        return buttonColumnsWrapper;
    }

    private createFunctionsColumn() {
        const functionsColumn = createDiv({className: ClassNames.FUNCTIONS, id: DomIds.FUNCTION_BUTTON_WRAPPER});

        const operationsConfig = this.userConfig.operations;
        const secondaryOperationList = operationsConfig.operator.slice(BUTTONS_PER_COLUMN + 1);
        const {sign, function: functions, constant, operator} = operationsConfig;

        this.appendButtonsGroup(this.uiKit.createDefaultButton, constant, functionsColumn);
        this.appendButtonsGroup(this.uiKit.createDefaultButton, sign, functionsColumn);
        this.appendButtonsGroup(this.uiKit.createDefaultButton, secondaryOperationList, functionsColumn);
        this.appendButtonsGroup(this.uiKit.createDefaultButton, functions, functionsColumn);
        return functionsColumn;
    }

    private createNumbersColumn() {
        const numbersColumn = createDiv({id: DomIds.NUMBER_BUTTON_WRAPPER, className: ClassNames.NUMBERS});
        const numberList = getDigitColumnItems(this.userConfig.digitSymbols).map(number => ({sign: number}));

        this.appendButtonsGroup(this.uiKit.createDefaultButton, numberList as any, numbersColumn);
        numbersColumn.appendChild(this.uiKit.createParenthesesButton());
        numbersColumn.appendChild(this.uiKit.createCEButton());
        numbersColumn.appendChild(this.uiKit.createDefaultButton({sign: "."}));
        numbersColumn.appendChild(this.uiKit.createEqualsButton({
            onClick: () => this.appEvents.onCalculateExpression.dispatch({
                expression: this.uiKit.getExpression()
            }),
        }));

        return numbersColumn;
    }

    private createOperationsColumn() {
        const operationsColumn = createDiv({id: DomIds.OPERATION_BUTTON_WRAPPER, className: ClassNames.OPERATIONS});
        const primaryOperationList = this.userConfig.operations.operator.slice(0, BUTTONS_PER_COLUMN + 1);

        this.appendButtonsGroup(this.uiKit.createDefaultButton, primaryOperationList, operationsColumn);
        return operationsColumn;
    }

    private appendButtonsGroup(
        buttonCreator: typeof this.uiKit.createDefaultButton,
        buttonsPropsList: FunctionOperationList,
        root: HTMLDivElement
    ): void {
        buttonsPropsList.forEach(buttonProps => {
            const button = buttonCreator.call(this.uiKit, buttonProps);
            root.appendChild(button);
        });
    }
}