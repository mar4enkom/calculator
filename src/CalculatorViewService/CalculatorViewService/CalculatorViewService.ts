import {CalculatorUIKit} from "viewService/helpers/ui/CalculatorUIKit";
import {getDigitColumnItems} from "viewService/utils/getDigitColumnItems";
import {BasicOperationList, FunctionOperationList} from "userConfig/operations/types";
import {ICalculatorViewService, RenderEqualsButtonArgs} from "shared/types/types";

export class CalculatorViewService implements ICalculatorViewService {
    ui: CalculatorUIKit;
    constructor() {
        this.ui = new CalculatorUIKit();
        this.ui.inputElement.focus();
    }

    renderDotButton(root: HTMLDivElement): void {
        const button = this.ui.createDefaultButton({sign: "."});
        root.appendChild(button);
    }

    renderCEButton(root: HTMLDivElement): void {
        const button = this.ui.createCEButton();
        root.appendChild(button);
    }

    renderEqualsButton({onClick, root}: RenderEqualsButtonArgs): void {
        const button = this.ui.createEqualsButton({ onClick });
        root.appendChild(button);
    }

    renderParenthesesButton(root: HTMLDivElement): void {
        const button = this.ui.createParenthesesButton();
        root.appendChild(button);
    }

    renderSignButtonList(signList: BasicOperationList, root: HTMLDivElement): void {
        this.renderButtonsGroup(this.ui.createDefaultButton, signList, root);
    }

    renderConstantButtonList(constantList: BasicOperationList, root: HTMLDivElement): void {
        this.renderButtonsGroup(this.ui.createDefaultButton, constantList, root);
    }

    renderFunctionButtonList(functionList: FunctionOperationList, root: HTMLDivElement): void {
        this.renderButtonsGroup(this.ui.createFunctionButton, functionList, root);
    }
    renderDigitButtonList(root: HTMLDivElement): void {
        const numberList = getDigitColumnItems().map(number => ({sign: number}));
        this.renderButtonsGroup(this.ui.createDefaultButton, numberList as any, root);
    }
    renderOperationList(primaryOperationList: FunctionOperationList, root: HTMLDivElement): void {
        this.renderButtonsGroup(this.ui.createDefaultButton, primaryOperationList, root);
    }

    private renderButtonsGroup(
        buttonCreator: typeof this.ui.createDefaultButton,
        buttonsPropsList: FunctionOperationList,
        root: HTMLDivElement
    ): void {
        buttonsPropsList.forEach(buttonProps => {
            const button = buttonCreator.call(this.ui, buttonProps);
            root.appendChild(button);
        });
    }
}