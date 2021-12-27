export interface IDateProviders {
    compareDateInHour(start_date: Date, end_date: Date): number;
    convertDateToUtc(data: Date): string;
    dateNow(): Date;
    compareDateInDays(start_date: Date, end_date: Date): number;
}
