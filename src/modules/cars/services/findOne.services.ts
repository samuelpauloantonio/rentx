import AppError from '../../../erros/AppError';
import {
    Categories,
    ICategoryRepository,
} from '../repositories/ICategoriesRepository';

export default class FindOne {
    private categoriersRepository: ICategoryRepository;

    constructor(private CategoryRepository: ICategoryRepository) {
        this.categoriersRepository = CategoryRepository;
    }

    execute(id: string): Categories {
        const category = this.categoriersRepository.findOne(id);

        if (!category) throw new AppError('Category not found ');

        return category;
    }
}
