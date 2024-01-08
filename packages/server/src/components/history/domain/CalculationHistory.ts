import {HistoryRepository} from "../dataAccess/types";

export class CalculationHistory {
    private repository: HistoryRepository;
    constructor(repository: HistoryRepository) {
        this.repository = repository;
    }

    async getLastRecords() {
        return await this.repository.getLastRecords();
    }
}