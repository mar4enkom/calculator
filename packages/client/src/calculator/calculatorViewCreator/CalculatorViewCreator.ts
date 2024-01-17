import {CalculatorUIKit} from "@/calculator/calculatorViewCreator/uiKit/CalculatorUIKit";
import {FunctionOperationList, Config} from "@calculator/common";
import {createDiv} from "@/shared/utils/viewUtils/createDiv";
import {ClassNames, DomIds} from "@/shared/contstants/dom";
import {getDigitColumnItems} from "@/calculator/calculatorViewCreator/utils/getDigitColumnItems";
import {calculatorEvents} from "@/calculator";


const BUTTONS_PER_COLUMN = 4;

export class CalculatorViewCreator {
    public uiKit: CalculatorUIKit;
    private config: Config;

    constructor(config: Config) {
        this.config = config;
        this.uiKit = new CalculatorUIKit(this.config.symbols);
    }

    createCalculatorUI() {
        const buttonColumnsWrapper = createDiv({className: ClassNames.BUTTONS_WRAPPER})

        this.uiKit.inputElement.focus();

        buttonColumnsWrapper.appendChild(this.createFunctionsColumn());
        buttonColumnsWrapper.appendChild(this.createNumbersColumn());
        buttonColumnsWrapper.appendChild(this.createOperationsColumn());

        return buttonColumnsWrapper;
    }

    private createFunctionsColumn() {
        const functionsColumn = createDiv({className: ClassNames.FUNCTIONS, id: DomIds.FUNCTION_BUTTON_WRAPPER});

        const operationsConfig = this.config.operations;
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
        const numberList = getDigitColumnItems(this.config.digitSymbols).map(number => ({sign: number}));

        this.appendButtonsGroup(this.uiKit.createDefaultButton, numberList as any, numbersColumn);
        numbersColumn.appendChild(this.uiKit.createParenthesesButton());
        numbersColumn.appendChild(this.uiKit.createCEButton());
        numbersColumn.appendChild(this.uiKit.createDefaultButton({sign: "."}));
        numbersColumn.appendChild(this.uiKit.createEqualsButton({
            onClick: () => calculatorEvents.onCalculateExpression.dispatch({
                expression: this.uiKit.getExpression()
            }),
        }));

        return numbersColumn;
    }

    private createOperationsColumn() {
        const operationsColumn = createDiv({id: DomIds.OPERATION_BUTTON_WRAPPER, className: ClassNames.OPERATIONS});
        const primaryOperationList = this.config.operations.operator.slice(0, BUTTONS_PER_COLUMN + 1);

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