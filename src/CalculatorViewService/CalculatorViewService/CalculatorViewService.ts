import {CalculatorUIKit} from "viewService/helpers/ui/CalculatorUIKit";
import {getDigitColumnItems} from "viewService/utils/getDigitColumnItems";
import {BasicOperationList, FunctionOperationList, Operation} from "userConfig/operations/types";
import {ICalculatorViewService} from "shared/types/types";

export class CalculatorViewService implements ICalculatorViewService {
    ui: CalculatorUIKit;
    constructor() {
        this.ui = new CalculatorUIKit();
        this.ui.inputElement.focus();
    }

    renderDotButton(root: HTMLDivElement) {
        const button = this.ui.createDefaultButton({sign: "."});
        root.appendChild(button);
    }

    renderCEButton(root: HTMLDivElement) {
        const button = this.ui.createCEButton();
        root.appendChild(button);
    }

    renderEqualsButton({onClick, root}: {onClick: () => void, root: HTMLDivElement}) {
        const button = this.ui.createEqualsButton({ onClick });
        root.appendChild(button);
    }

    renderParenthesesButton(root: HTMLDivElement) {
        const button = this.ui.createParenthesesButton();
        root.appendChild(button);
    }

    renderSignButtonList(signList: BasicOperationList, root: HTMLDivElement) {
        this.#renderButtonsGroup(this.ui.createDefaultButton, signList, root);
    }

    renderConstantButtonList(constantList: BasicOperationList, root: HTMLDivElement) {
        this.#renderButtonsGroup(this.ui.createDefaultButton, constantList, root);
    }

    renderFunctionButtonList(functionList: FunctionOperationList, root: HTMLDivElement) {
        this.#renderButtonsGroup(this.ui.createFunctionButton, functionList, root);
    }
    renderDigitButtonList(root: HTMLDivElement) {
        const numberList = getDigitColumnItems().map(number => ({sign: number}));
        this.#renderButtonsGroup(this.ui.createDefaultButton, numberList as any, root);
    }
    renderOperationList(primaryOperationList: FunctionOperationList, root: HTMLDivElement) {
        this.#renderButtonsGroup(this.ui.createDefaultButton, primaryOperationList, root);
    }

    #renderButtonsGroup(
        buttonCreator: typeof this.ui.createDefaultButton,
        buttonsPropsList: FunctionOperationList,
        root: HTMLDivElement
    ) {
        buttonsPropsList.forEach(buttonProps => {
            const button = buttonCreator.call(this.ui, buttonProps);
            root.appendChild(button);
        });
    }
}