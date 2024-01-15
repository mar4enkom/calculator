import {HistoryItem, MaybeUndefined} from "@calculator/common";
import {AppElement} from "@/shared/ui/types";
import "./historyDialogContentItem.css";


export type OnHistoryDialogContentItemClick = (a: HistoryItem) => void;
export type OnLoadMoreClick = () => void;
interface HistoryDialogContentItemElement extends AppElement {
    itemProps(itemProps: HistoryItem): this;
    onClick(onClick: OnHistoryDialogContentItemClick): this;
}

export class HistoryDialogContentItem implements HistoryDialogContentItemElement {
    private _itemProps: MaybeUndefined<HistoryItem>;
    private _onClick: MaybeUndefined<OnHistoryDialogContentItemClick>;
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

    itemProps(itemProps: HistoryItem): this {
        this._itemProps = itemProps;
        return this;
    }

    onClick(onClick: MaybeUndefined<OnHistoryDialogContentItemClick>): this {
        this._onClick = onClick;
        return this;
    }
}