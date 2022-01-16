import { inject, injectable } from 'tsyringe';
import {
    Categories,
    ICategoryRepository,
} from '../../repositories/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject('CategoryRepository')
        private categoryRepository: ICategoryRepository,
    ) {}

    async execute(id?: string): Promise<Categories[] | Categories> {
        const categories = id
            ? await this.categoryRepository.findOne(id)
            : await this.categoryRepository.list();

        return categories;
    }
}
export { ListCategoriesUseCase };
