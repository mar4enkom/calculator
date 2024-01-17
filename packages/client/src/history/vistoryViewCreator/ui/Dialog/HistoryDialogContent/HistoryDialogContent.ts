import {CalculationHistory, MaybeUndefined} from "@calculator/common";
import {AppElement} from "@/shared/ui/types";
import {
    HistoryDialogContentItem,
    OnHistoryDialogContentItemClick, OnLoadMoreClick
} from "@/history/vistoryViewCreator/ui/Dialog/HistoryDialogContent/HistoryDialogContentItem";
import "./historyDialogContent.css";

export interface HistoryDialogContentElement extends AppElement {
    calculationHistory(itemProps: CalculationHistory): this;
    onItemClick(onClick: OnHistoryDialogContentItemClick): this;
    onLoadMoreClick(onClick: OnLoadMoreClick): this;
    onScroll(onScroll: (scrollTop: number) => void): this;
    initialScroll(a: number): this;
}

interface LoadMoreButtonProps {
    onClick: () => void;
}

export class HistoryDialogContent implements HistoryDialogContentElement {
    private _calculationHistory: MaybeUndefined<CalculationHistory>;
    private _onItemClick: MaybeUndefined<OnHistoryDialogContentItemClick>;
    private _onLoadMoreClick: MaybeUndefined<OnLoadMoreClick>;
    private _onScroll: MaybeUndefined<(event: Event) => void>;
    private _initialScroll: MaybeUndefined<number>;

    create(): HTMLElement {
        const contentWrapper = document.createElement("div");
        contentWrapper.classList.add("dialog-content-wrapper")
        const historyItems = this.createHistoryItems();
        const loadMoreButton = this.createLoadMoreButtonElement({
            onClick: () => this._onLoadMoreClick?.()
        });

        historyItems.addEventListener("scroll", (event) => {
            this._onScroll?.(event);
        });

        contentWrapper.appendChild(historyItems);
        contentWrapper.appendChild(loadMoreButton);

        queueMicrotask(() => {
            if(this._initialScroll != null) {
                historyItems.scrollTop = this._initialScroll;
            }
        })

        return contentWrapper;
    }

    calculationHistory(calculationHistory: CalculationHistory): this {
        this._calculationHistory = calculationHistory;
        return this;
    }

    onItemClick(onItemClick: OnHistoryDialogContentItemClick): this {
        this._onItemClick = onItemClick;
        return this;
    }

    onLoadMoreClick(onLoadMoreClick: OnLoadMoreClick): this {
        this._onLoadMoreClick = onLoadMoreClick;
        return this;
    }

    onScroll(onScroll: (scrollTop: number) => void): this {
        this._onScroll = (event: Event) => {
            const scrollTop = (event.target as HTMLElement).scrollTop;
            onScroll(scrollTop);
        };
        return this;
    }

    initialScroll(initialScroll: number | undefined = 0): this {
        this._initialScroll = initialScroll;
        return this;
    }

    private createHistoryItems(): HTMLDivElement {
        if(!this._calculationHistory) throw new Error("calculationHistory is required");

        const historyItemsWrapper = document.createElement("div");
        historyItemsWrapper.classList.add("dialog-history-items-wrapper");

        for (const historyItemProps of this._calculationHistory) {
            const contentItem = new HistoryDialogContentItem()
                .itemProps(historyItemProps)
                .onClick(this._onItemClick)
                .create();
            historyItemsWrapper.appendChild(contentItem)
        }

        return historyItemsWrapper;
    }

    private createLoadMoreButtonElement({onClick}: LoadMoreButtonProps) {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-light", "btn-sm");
        button.addEventListener("click", onClick);
        button.textContent = "Load more";
        return button;
    }
}