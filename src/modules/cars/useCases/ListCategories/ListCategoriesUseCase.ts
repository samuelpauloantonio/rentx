import {
    Categories,
    ICategoryRepository,
} from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
    constructor(private categoryRepository: ICategoryRepository) {}

    execute(): Categories[] {
        const categories = this.categoryRepository.list();

        return categories;
    }
}
export { ListCategoriesUseCase };
