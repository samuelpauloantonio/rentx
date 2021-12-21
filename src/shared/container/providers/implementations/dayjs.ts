import { IDateProviders } from '@shared/container/providers/DateDayjsProvides/IDateProviders';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export class DayjsProvider implements IDateProviders {
    compareDateInHour(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertDateToUtc(end_date);
        const start_date_utc = this.convertDateToUtc(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, 'hour');
    }

    convertDateToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }
}
