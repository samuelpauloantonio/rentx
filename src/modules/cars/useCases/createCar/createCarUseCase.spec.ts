import { CarRepositoryInMemory } from '@modules/cars/repositories/in-Memory/carRepositoryInMemory';
import { AppError } from '@shared/erros/AppError';
import { CreateCarUseCase } from './createCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe('Create Car', () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carRepositoryInMemory);
    });
    it('Should be able to create a new Car', async () => {
        const car = await createCarUseCase.execute({
            category_id: 'category',
            daily_rate: 11233,
            description: 'description car',
            fine_amount: 1000,
            license_plate: 'ABC-123',
            name: 'name Car',
            brand: 'brand5',
        });

        expect(car).toHaveProperty('id');
    });

    it('Should not be able to create car with plate already exists', async () => {
        await expect(async () => {
            await createCarUseCase.execute({
                category_id: 'categoria teste',
                daily_rate: 11233,
                description: 'description car',
                fine_amount: 1000,
                license_plate: 'ABC-123',
                name: 'name Car1',
                brand: 'brand6',
            });

            await createCarUseCase.execute({
                category_id: 'categoria teste',
                daily_rate: 11233,
                description: 'description car',
                fine_amount: 1000,
                license_plate: 'ABC-123',
                name: 'name Car2',
                brand: 'brand7',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to create a car with available true by default', async () => {
        const car = await createCarUseCase.execute({
            category_id: 'category',
            daily_rate: 11233,
            description: 'description car',
            fine_amount: 1000,
            license_plate: 'ABCD-123',
            name: 'Car available',
            brand: 'brand8',
        });

        expect(car.available).toBe(true);
    });
});
