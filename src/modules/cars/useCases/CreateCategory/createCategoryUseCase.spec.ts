import { AppError } from '@shared/erros/AppError';
import { CategoryRepositoryInMemory } from '@modules/cars/repositories/in-Memory/categoryRepositoryInMemory';
import { CreateCategoriesUseCase } from '@modules/cars/useCases/CreateCategory/createCategoriesUseCase';

let createCategoriesUseCase: CreateCategoriesUseCase;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory;
describe('Create Category', () => {
    const category = {
        name: 'category de test',
        description: 'description test',
    };
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
        createCategoriesUseCase = new CreateCategoriesUseCase(
            categoriesRepositoryInMemory,
        );
    });
    it('should be able to create a new Category', async () => {
        await createCategoriesUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name,
        );
        expect(categoryCreated).toHaveProperty('id');
    });

    it('should not be able to create a new category if it already exists', async () => {
        await createCategoriesUseCase.execute({
            name: category.name,
            description: category.description,
        });
        await expect(async () => {
            await createCategoriesUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toEqual(new AppError('category already exists!'));
    });
});
