import {CalculationHistoryItem, MaybeUndefined} from "@calculator/common";
import {AppElement} from "@/shared/ui/types";
import "./historyDialogContentItem.css";


export type onHistoryDialogContentItemClick = (a: CalculationHistoryItem) => void;
interface HistoryDialogContentItemElement extends AppElement {
    itemProps(itemProps: CalculationHistoryItem): this;
    onClick(onClick: onHistoryDialogContentItemClick): this;
}

export class HistoryDialogContentItem implements HistoryDialogContentItemElement {
    private _itemProps: MaybeUndefined<CalculationHistoryItem>;
    private _onClick: MaybeUndefined<onHistoryDialogContentItemClick>;
    create(): HTMLElement {
        if(!this._itemProps) throw new Error("Item props is required")

        const dialogContentItemWrapper = document.createElement("div");
        dialogContentItemWrapper.classList.add("dialog-content-item-wrapper");
        const dialogContentItemButton = document.createElement("button");
        dialogContentItemButton.classList.add("dialog-content-item-button");
        dialogContentItemButton.innerHTML = `
            <span>${this._itemProps.expression}</span>
            <span>=</span>
            <span>${this._itemProps.expressionResult}</span>            
        `;
        dialogContentItemButton.addEventListener("click", () => this._onClick?.(this._itemProps!))

        dialogContentItemWrapper.appendChild(dialogContentItemButton);

        return dialogContentItemWrapper;
    }

    itemProps(itemProps: CalculationHistoryItem): this {
        this._itemProps = itemProps;
        return this;
    }

    onClick(onClick: MaybeUndefined<onHistoryDialogContentItemClick>): this {
        this._onClick = onClick;
        return this;
    }
}