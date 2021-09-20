/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../erros/AppError';
import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

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
