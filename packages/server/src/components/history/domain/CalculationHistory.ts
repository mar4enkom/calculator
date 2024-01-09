import {HistoryRepository} from "../dataAccess/types";
import {CalculationHistoryPayload} from "@calculator/common";

export class CalculationHistory {
    private repository: HistoryRepository;
    constructor(repository: HistoryRepository) {
        this.repository = repository;
    }

    async getLastRecords(payload: CalculationHistoryPayload) {
        return await this.repository.getLastRecords();
    }
}