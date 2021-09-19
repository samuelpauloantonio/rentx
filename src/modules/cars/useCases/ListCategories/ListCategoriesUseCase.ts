import {
    Categories,
    ICategoryRepository,
} from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
    constructor(private categoryRepository: ICategoryRepository) {}

    async execute(id?: string): Promise<Categories[] | Categories> {
        const categories = id
            ? await this.categoryRepository.findOne(id)
            : await this.categoryRepository.list();

        return categories;
    }
}
export { ListCategoriesUseCase };
