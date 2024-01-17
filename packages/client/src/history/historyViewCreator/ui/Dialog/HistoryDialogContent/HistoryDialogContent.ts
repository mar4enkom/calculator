import {CalculationHistory, MaybeUndefined} from "@calculator/common";
import {AppElement} from "@/shared/ui/types";
import {
    HistoryDialogContentItem,
    OnHistoryDialogContentItemClick, OnLoadMoreClick
} from "@/history/historyViewCreator/ui/Dialog/HistoryDialogContent/HistoryDialogContentItem";
import "./historyDialogContent.css";

type OnHistoryDialogContentScroll = (scrollTop: number) => void;
export interface HistoryDialogContentElement extends AppElement {
    setItems(itemProps: CalculationHistory): this;
    setInitialScrollTop(a: number): this;
    disableLoadMore(a: boolean): this;
    onItemClick(onClick: OnHistoryDialogContentItemClick): this;
    onLoadMoreClick(onClick: OnLoadMoreClick): this;
    onScroll(onScroll: OnHistoryDialogContentScroll): this;
}

interface LoadMoreButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export class HistoryDialogContent implements HistoryDialogContentElement {
    private _items: MaybeUndefined<CalculationHistory>;
    private _disableLoadMore: boolean = false;
    private _initialScroll: MaybeUndefined<number>;
    private _onItemClick: MaybeUndefined<OnHistoryDialogContentItemClick>;
    private _onLoadMoreClick: MaybeUndefined<OnLoadMoreClick>;
    private _onScroll: MaybeUndefined<(event: Event) => void>;

    create(): HTMLElement {
        const contentWrapper = document.createElement("div");
        contentWrapper.classList.add("dialog-content-wrapper")
        const historyItems = this.createHistoryItems();
        const loadMoreButton = this.createLoadMoreButtonElement({
            onClick: () => this._onLoadMoreClick?.(),
            disabled: this._disableLoadMore
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
        });

        return contentWrapper;
    }

    setItems(calculationHistory: CalculationHistory): this {
        this._items = calculationHistory;
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

    onScroll(onScroll: OnHistoryDialogContentScroll): this {
        this._onScroll = (event: Event) => {
            const scrollTop = (event.target as HTMLElement).scrollTop;
            onScroll(scrollTop);
        };
        return this;
    }

    setInitialScrollTop(initialScroll: number | undefined = 0): this {
        this._initialScroll = initialScroll;
        return this;
    }

    disableLoadMore(disableLoadMore: boolean): this {
        this._disableLoadMore = disableLoadMore;
        return this;
    }

    private createHistoryItems(): HTMLDivElement {
        if(!this._items) throw new Error("calculationHistory is required");

        const historyItemsWrapper = document.createElement("div");
        historyItemsWrapper.classList.add("dialog-history-items-wrapper");

        for (const historyItemProps of this._items) {
            const contentItem = new HistoryDialogContentItem()
                .itemProps(historyItemProps)
                .onClick(this._onItemClick)
                .create();
            historyItemsWrapper.appendChild(contentItem)
        }

        return historyItemsWrapper;
    }

    private createLoadMoreButtonElement({onClick, disabled}: LoadMoreButtonProps) {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-light", "btn-sm");
        button.addEventListener("click", onClick);
        button.textContent = "Load more";
        button.disabled = disabled;
        return button;
    }
}