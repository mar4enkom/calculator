import {InsertionModes, OperationButton} from "./ui/OperationButton.js";
import {Symbols} from "../../../../../userConfig/operations/constants/constants.js";
import {getNumberColumnItems} from "../utils/getNumberColumnItems.js";
import {Operations} from "../../../../../userConfig/operations/constants/operations.js";

export class CalculatorUIBuilder {
    constructor(ui, events, config) {
        this.ui = ui;
        this.events = events;
        this.config = config;

        this.ui.inputElement.focus();
    }

    render() {
        this.#renderButtonsGroup(this.ui.createDefaultButton, this.config[Operations.SIGN], this.ui.functionsColumn);
        this.#renderButtonsGroup(this.ui.createDefaultButton, this.config[Operations.CONSTANT], this.ui.functionsColumn);
        this.#renderButtonsGroup(this.ui.createFunctionButton, this.config[Operations.FUNCTION], this.ui.functionsColumn);
        this.#renderButtonsGroup(this.ui.createDefaultButton, this.config[Operations.OPERATOR], this.ui.operationsColumn);
        this.#renderButtonsGroup(
            this.ui.createDefaultButton,
            getNumberColumnItems().map(number => ({sign: number})),
            this.ui.numbersColumn
        );

        this.#renderElementsGroup([
            this.ui.createDefaultButton({sign: "."}),
            this.ui.createParenthesesButton(),
            this.ui.createCEButton(),
            this.ui.createEqualsButton({
                onClick: () => this.events.handleCalculateExpression(this.ui.getExpression()),
            }),
        ], this.ui.numbersColumn);
    }

    #renderButtonsGroup(createButton, buttonsPropsList, root) {
        buttonsPropsList.forEach(buttonProps => {
            const button = createButton.call(this.ui, buttonProps);
            root.appendChild(button);
        });
    }

    #renderElementsGroup(elementList, root) {
        elementList.forEach(element => {
            root.appendChild(element);
        });
    }
}