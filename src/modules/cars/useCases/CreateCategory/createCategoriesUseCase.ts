/* eslint-disable no-useless-constructor */
import { AppError } from '@shared/erros/AppError';
import { ICategoryRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

type RequeestCategoryProps = {
    name: string;
    description: string;
};

@injectable()
class CreateCategoriesUseCase {
    constructor(
        @inject('CategoryRepository')
        private categoriesRepository: ICategoryRepository,
    ) {}

    async execute({ name, description }: RequeestCategoryProps): Promise<void> {
        const verifyAlreadyExist = await this.categoriesRepository.findByName(
            name,
        );

        if (verifyAlreadyExist) throw new AppError('category already exists!');

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoriesUseCase };
