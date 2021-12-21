import { container } from 'tsyringe';
import { DayjsProvider } from '@shared/container/providers/implementations/dayjs';
import { IDateProviders } from '@shared/container/providers/DateDayjsProvides/IDateProviders';

container.registerSingleton<IDateProviders>('DayJsDateProvider', DayjsProvider);
