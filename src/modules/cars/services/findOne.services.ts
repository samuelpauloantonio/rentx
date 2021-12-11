import { AppError } from '@shared/erros/AppError';

import {
    Categories,
    ICategoryRepository,
} from '../repositories/ICategoriesRepository';

export default class FindOne {
    private categoriersRepository: ICategoryRepository;

    constructor(private CategoryRepository: ICategoryRepository) {
        this.categoriersRepository = this.CategoryRepository;
    }

    async execute(id: string): Promise<Categories> {
        const category = await this.categoriersRepository.findOne(id);

        if (!category) throw new AppError('Category not found ');

        return category;
    }
}
