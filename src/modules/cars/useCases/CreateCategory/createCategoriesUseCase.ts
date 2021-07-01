/* eslint-disable no-useless-constructor */
import AppError from '../../../../erros/AppError';
import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

type RequeestCategoryProps = {
    name: string;
    description: string;
};

class CreateCategoriesUseCase {
    constructor(private categoriesRepository: ICategoryRepository) {}

    execute({ name, description }: RequeestCategoryProps): void {
        const verifyAlreadyExist = this.categoriesRepository.findByName(name);
        if (verifyAlreadyExist) throw new AppError('category already exists!');

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoriesUseCase, AppError };
