import { CarRepositoryInMemory } from '@modules/cars/repositories/in-Memory/carRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-Memory/specificationsRepositoryInMemory';
import { AppError } from '@shared/erros/AppError';
import { CreateCarSpecificationUseCase } from './createCarSpecificationUseCase';

let carRepositoryInMemory: CarRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carRepositoryInMemory,
            specificationsRepositoryInMemory,
        );
    });

    it('Should be able to add new Car specification to the car ', async () => {
        const car = await carRepositoryInMemory.create({
            category_id: 'categoria teste',
            daily_rate: 11233,
            description: 'description car',
            fine_amount: 1000,
            license_plate: 'ABC-1211',
            name: 'name Car0',
            brand: 'brand7',
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: 'nova specificacao1',
            description: 'description test',
        });
        const carSpecification = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications: [specification.id],
        });

        expect(carSpecification).toHaveProperty('specifications');
        expect(carSpecification.specifications.length).toBe(1);
    });

    it('Should not be able to add new Car specification for car not-existent ', async () => {
        await expect(async () => {
            const specifications = ['new specification'];

            await createCarSpecificationUseCase.execute({
                car_id: 'id not exist',
                specifications,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
