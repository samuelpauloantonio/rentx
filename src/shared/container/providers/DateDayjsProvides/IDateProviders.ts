export interface IDateProviders {
    compareDateInHour(start_date: Date, end_date: Date): number;
    convertDateToUtc(data: Date): string;
    dateNow(): Date;
    compareDateInDays(start_date: Date, end_date: Date): number;
    addDays(days: number): Date;
    addHours(hour: number): Date;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
}
