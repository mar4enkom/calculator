import {Operations} from "UserConfig/constants/operations.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {InsertionModes, OperationButton} from "ViewService/helpers/ui/OperationButton.js";
import {CalculatorUIKit} from "ViewService/helpers/ui/CalculatorUIKit.js";
import {getDigitColumnItems} from "ViewService/utils/getDigitColumnItems.js";

export class CalculatorViewService {
    constructor() {
        this.ui = new CalculatorUIKit();
        this.ui.inputElement.focus();
    }

    renderDotButton(root) {
        const button = this.ui.createDefaultButton({sign: "."});
        root.appendChild(button);
    }

    renderCEButton(root) {
        const button = this.ui.createCEButton();
        root.appendChild(button);
    }

    renderEqualsButton({onClick, root}) {
        const button = this.ui.createEqualsButton({ onClick });
        root.appendChild(button);
    }

    renderParenthesesButton(root) {
        const button = this.ui.createParenthesesButton();
        root.appendChild(button);
    }

    renderSignButtonList(signList, root) {
        this.#renderButtonsGroup(this.ui.createDefaultButton, signList, root);
    }

    renderConstantButtonList(constantList, root) {
        this.#renderButtonsGroup(this.ui.createDefaultButton, constantList, root);
    }

    renderFunctionButtonList(functionList, root) {
        this.#renderButtonsGroup(this.ui.createFunctionButton, functionList, root);
    }
    renderDigitButtonList(root) {
        const numberList = getDigitColumnItems().map(number => ({sign: number}));
        this.#renderButtonsGroup(this.ui.createDefaultButton, numberList, root);
    }
    renderOperationList(primaryOperationList, root) {
        this.#renderButtonsGroup(this.ui.createDefaultButton, primaryOperationList, root);
    }

    #renderButtonsGroup(buttonCreator, buttonsPropsList, root) {
        buttonsPropsList.forEach(buttonProps => {
            const button = buttonCreator.call(this.ui, buttonProps);
            root.appendChild(button);
        });
    }
}