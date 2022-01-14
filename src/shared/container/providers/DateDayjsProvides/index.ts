import { container } from 'tsyringe';
import { IDateProviders } from '@shared/container/providers/DateDayjsProvides/IDateProviders';
import { DayjsProvider } from '@shared/container/providers/DateDayjsProvides/implementations/dayjs';

container.registerSingleton<IDateProviders>('DayJsDateProvider', DayjsProvider);
