import {Symbols} from "@userConfig/constants/constants.js";
import {Operations} from "@userConfig/constants/operations.js";
import {InsertionModes, OperationButton} from "@calculator/view/helpers/ui/OperationButton.js";
import {getNumberColumnItems} from "@calculator/view/utils/getNumberColumnItems.js";

const BUTTONS_PER_COLUMN = 4;
export class CalculatorUIBuilder {
    constructor(ui, model, config) {
        this.ui = ui;
        this.model = model;
        this.config = config;

        this.ui.inputElement.focus();
    }

    renderCalculator() {
        const signList = this.config[Operations.SIGN];
        const constantList = this.config[Operations.CONSTANT];
        const functionList = this.config[Operations.FUNCTION];
        const numberList = getNumberColumnItems().map(number => ({sign: number}));
        const primaryOperationList = this.config[Operations.OPERATOR].slice(0, BUTTONS_PER_COLUMN + 1);
        const secondaryOperationList = this.config[Operations.OPERATOR].slice(BUTTONS_PER_COLUMN + 1)

        this.#renderButtonsGroup(this.ui.createDefaultButton, signList, this.ui.functionsColumn);
        this.#renderButtonsGroup(this.ui.createDefaultButton, constantList, this.ui.functionsColumn);
        this.#renderButtonsGroup(this.ui.createDefaultButton, secondaryOperationList, this.ui.functionsColumn);
        this.#renderButtonsGroup(this.ui.createFunctionButton, functionList, this.ui.functionsColumn);
        this.#renderButtonsGroup(this.ui.createDefaultButton, primaryOperationList, this.ui.operationsColumn);
        this.#renderButtonsGroup(this.ui.createDefaultButton, numberList, this.ui.numbersColumn);

        this.#renderElementsGroup([
            this.ui.createDefaultButton({sign: "."}),
            this.ui.createParenthesesButton(),
            this.ui.createCEButton(),
            this.ui.createEqualsButton({
                onClick: () => this.model.handleCalculateExpression(this.ui.getExpression()),
            }),
        ], this.ui.numbersColumn);
    }

    #renderButtonsGroup(buttonCreator, buttonsPropsList, root) {
        buttonsPropsList.forEach(buttonProps => {
            const button = buttonCreator.call(this.ui, buttonProps);
            root.appendChild(button);
        });
    }

    #renderElementsGroup(elementList, root) {
        elementList.forEach(element => {
            root.appendChild(element);
        });
    }
}