import { CarRepositoryInMemory } from '@modules/cars/repositories/in-Memory/carRepositoryInMemory';
import { ListAvailableCarsUseCase } from './listAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe('List cars', () => {
    beforeEach(() => {
        carRepositoryInMemory = new CarRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carRepositoryInMemory);
    });

    it('Should be able to list all available cars', async () => {
        const cars = await carRepositoryInMemory.create({
            name: 'Audi',
            description: 'Carro veloz',
            fine_amount: 1100,
            category_id: 'categoria de teste',
            daily_rate: 1200,
            license_plate: 'abc_12',
            brand: 'Audi1',
        });
        const allListCats = await listCarsUseCase.execute({});

        expect(allListCats).toEqual([cars]);
    });
    it('Should be able to list available car by name', async () => {
        await carRepositoryInMemory.create({
            name: 'Audi name',
            description: 'Carro veloz',
            fine_amount: 1100,
            category_id: 'categoria de teste',
            daily_rate: 1200,
            license_plate: 'abc_123',
            brand: 'Audi2',
        });
        const carName = (
            await listCarsUseCase.execute({ name: 'Audi name' })
        ).find(car => car.name === 'Audi name');

        expect(carName.name).toEqual('Audi name');
    });

    it('Should be able to list available car by category_id', async () => {
        await carRepositoryInMemory.create({
            name: 'Audi category_id',
            description: 'Carro veloz',
            fine_amount: 1100,
            category_id: 'hsdhhsdjdjsyusyuds',
            daily_rate: 1200,
            license_plate: 'abc_1234',
            brand: 'Audi3',
        });
        const carCat = (
            await listCarsUseCase.execute({ category_id: 'hsdhhsdjdjsyusyuds' })
        ).find(car => car.category_id === 'hsdhhsdjdjsyusyuds');

        expect(carCat.category_id).toEqual('hsdhhsdjdjsyusyuds');
    });

    it('Should be able to list available car by brand', async () => {
        await carRepositoryInMemory.create({
            name: 'Audi brand',
            brand: 'Audi4',
            description: 'Carro veloz',
            fine_amount: 1100,
            category_id: 'categoria de teste',
            daily_rate: 1200,
            license_plate: 'abc_12345',
        });
        const carBrand = (
            await listCarsUseCase.execute({ brand: 'Audi4' })
        ).find(car => car.brand === 'Audi4');

        expect(carBrand.brand).toEqual('Audi4');
    });
});
