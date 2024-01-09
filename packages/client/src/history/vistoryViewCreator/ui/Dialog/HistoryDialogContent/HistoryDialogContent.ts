import {CalculationHistory, MaybeUndefined} from "@calculator/common";
import {AppElement} from "@/shared/ui/types";
import {
    HistoryDialogContentItem,
    onHistoryDialogContentItemClick
} from "@/history/vistoryViewCreator/ui/Dialog/HistoryDialogContent/HistoryDialogContentItem";
import "./historyDialogContent.css";

export interface HistoryDialogContentElement extends AppElement {
    calculationHistory(itemProps: CalculationHistory): this;
    onItemClick(onClick: onHistoryDialogContentItemClick): this;
}

export class HistoryDialogContent implements HistoryDialogContentElement {
    private _calculationHistory: MaybeUndefined<CalculationHistory>;
    private _onClick: MaybeUndefined<onHistoryDialogContentItemClick>;

    create(): HTMLElement {
        const contentWrapper = document.createElement("div");
        contentWrapper.classList.add("dialog-content-wrapper")
        this.appendHistoryItems(contentWrapper);

        return contentWrapper;
    }

    calculationHistory(calculationHistory: CalculationHistory): this {
        this._calculationHistory = calculationHistory;
        return this;
    }

    onItemClick(onClick: onHistoryDialogContentItemClick): this {
        this._onClick = onClick;
        return this;
    }

    private appendHistoryItems(root: HTMLDivElement) {
        if(!this._calculationHistory) throw new Error("calculationHistory is required");

        for (const historyItemProps of this._calculationHistory) {
            const contentItem = new HistoryDialogContentItem()
                .itemProps(historyItemProps)
                .onClick(this._onClick)
                .create();
            root.appendChild(contentItem)
        }
    }
}