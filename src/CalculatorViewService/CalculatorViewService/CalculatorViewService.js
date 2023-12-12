import {OperationCategoryName} from "userConfig/constants/operationCategoryName.ts";
import {Symbols} from "userConfig/constants/constants.js";
import {InsertionModes, OperationButton} from "viewService/helpers/ui/OperationButton.js";
import {CalculatorUIKit} from "viewService/helpers/ui/CalculatorUIKit.js";
import {getDigitColumnItems} from "viewService/utils/getDigitColumnItems.ts";

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