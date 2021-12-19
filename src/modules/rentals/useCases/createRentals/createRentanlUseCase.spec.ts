import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-Memory/rentalsRepositoryInMemory';
import { CreateRentalsUseCase } from '@modules/rentals/useCases/createRentals/createRentalsUseCase';
import { AppError } from '@shared/erros/AppError';

let createRentalsUseCase: CreateRentalsUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rentals', () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalsUseCase = new CreateRentalsUseCase(
            rentalsRepositoryInMemory,
        );
    });
    it('Should be able to create a new Rentals', async () => {
        const rental = await createRentalsUseCase.execute({
            car_id: '123445',
            user_id: '111223',
            expected_return_date: new Date(),
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    });

    it('Should not  be able to create a new Rental if there is nother open to the same user', async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                car_id: '1234e',
                user_id: '111277',
                expected_return_date: new Date(),
            });

            await createRentalsUseCase.execute({
                car_id: '1234409',
                user_id: '111277',
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not  be able to create a new Rental if there is nother open to the same Car', async () => {
        expect(async () => {
            await createRentalsUseCase.execute({
                car_id: '123446',
                user_id: '111223',
                expected_return_date: new Date(),
            });

            await createRentalsUseCase.execute({
                car_id: '123446',
                user_id: '111277',
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);

        // console.log(rental);
    });
});
