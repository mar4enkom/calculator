import {CalculationHistoryPayload} from "@calculator/common";
import {HistoryRepository} from "@/history/dataAccess/types";

export class CalculationHistory {
    private repository: HistoryRepository;
    constructor(repository: HistoryRepository) {
        this.repository = repository;
    }

    async getLastRecords(payload: CalculationHistoryPayload) {
        return await this.repository.getLastRecords();
    }
}