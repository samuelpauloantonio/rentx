import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-Memory/rentalsRepositoryInMemory';
import { CreateRentalsUseCase } from '@modules/rentals/useCases/createRentals/createRentalsUseCase';
import { AppError } from '@shared/erros/AppError';
import dayjs from 'dayjs';
import { DayjsProvider } from '@shared/container/providers/DateDayjsProvides/implementations/dayjs';
import { CarRepositoryInMemory } from '@modules/cars/repositories/in-Memory/carRepositoryInMemory';

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsProvider: DayjsProvider;
let dateFormatted: Date;
let carRepository: CarRepositoryInMemory;

describe('Create Rentals', () => {
    beforeEach(() => {
        dateFormatted = dayjs().add(1, 'day').toDate();
        dayJsProvider = new DayjsProvider();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carRepository = new CarRepositoryInMemory();
        createRentalsUseCase = new CreateRentalsUseCase(
            rentalsRepositoryInMemory,
            dayJsProvider,
            carRepository,
        );
    });
    it('Should be able to create a new Rentals', async () => {
        const car = await carRepository.create({
            name: 'carro  novo',
            description: 'Carro non',
            fine_amount: 200,
            category_id: 'e6f15036-ba69-41f-b111',
            daily_rate: 1221,
            license_plate: 'ba69',
            brand: 'Corola',
        });

        const rental = await createRentalsUseCase.execute({
            car_id: car.id,
            user_id: '111223',
            expected_return_date: dateFormatted,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('Should not  be able to create a new Rental if there is another open to the same user', async () => {
        const car = await carRepository.create({
            name: 'carro de test um',
            description: 'Carro lento',
            fine_amount: 200,
            category_id: 'e6f15036-ba69-4a1f-b111',
            daily_rate: 1223,
            license_plate: '12343',
            brand: 'Corola',
        });

        await createRentalsUseCase.execute({
            car_id: car.id,
            user_id: '111277',
            expected_return_date: dateFormatted,
        });

        await expect(async () => {
            await createRentalsUseCase.execute({
                car_id: car.id,
                user_id: '111277',
                expected_return_date: dateFormatted,
            });
        }).rejects.toEqual(new AppError('Car is Unavailable'));
    });

    it('Should not  be able to create a new Rental if there is another open to the same Car', async () => {
        const car = await carRepository.create({
            name: 'carro de test',
            description: 'description 1',
            fine_amount: 200,
            category_id: 'e6f15036-ba69-4a1f-b111',
            daily_rate: 1223,
            license_plate: '1234q',
            brand: 'Corola',
        });
        await createRentalsUseCase.execute({
            car_id: car.id,
            user_id: '111223',
            expected_return_date: dateFormatted,
        });

        await expect(async () => {
            await createRentalsUseCase.execute({
                car_id: car.id,
                user_id: '111277',
                expected_return_date: dateFormatted,
            });
        }).rejects.toEqual(new AppError('Car is Unavailable'));
    });

    it('Should not  be able to create a new Rental with invalid date', async () => {
        await expect(async () => {
            await createRentalsUseCase.execute({
                car_id: '123446',
                user_id: '111277',
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toEqual(new AppError('Invalid Time Date'));
    });
});
