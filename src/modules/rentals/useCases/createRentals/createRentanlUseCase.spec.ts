import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-Memory/rentalsRepositoryInMemory';
import { CreateRentalsUseCase } from '@modules/rentals/useCases/createRentals/createRentalsUseCase';
import { AppError } from '@shared/erros/AppError';
import dayjs from 'dayjs';

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dateFormatted: Date;
describe('Create Rentals', () => {
    beforeEach(() => {
        dateFormatted = dayjs().add(1, 'day').toDate();
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalsUseCase = new CreateRentalsUseCase(
            rentalsRepositoryInMemory,
        );
    });
    it('Should be able to create a new Rentals', async () => {
        const rental = await createRentalsUseCase.execute({
            car_id: '123445',
            user_id: '111223',
            expected_return_date: dateFormatted,
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('Should not  be able to create a new Rental if there is another open to the same user', async () => {
        await expect(async () => {
            await createRentalsUseCase.execute({
                car_id: '1234e',
                user_id: '111277',
                expected_return_date: dateFormatted,
            });

            await createRentalsUseCase.execute({
                car_id: '1234409',
                user_id: '111277',
                expected_return_date: dateFormatted,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not  be able to create a new Rental if there is another open to the same Car', async () => {
        await expect(async () => {
            await createRentalsUseCase.execute({
                car_id: '123446',
                user_id: '111223',
                expected_return_date: dateFormatted,
            });

            await createRentalsUseCase.execute({
                car_id: '123446',
                user_id: '111277',
                expected_return_date: dateFormatted,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not  be able to create a new Rental with invalid date', async () => {
        await expect(async () => {
            await createRentalsUseCase.execute({
                car_id: '123446',
                user_id: '111277',
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
