import { v4 as uuid } from 'uuid';
import {
    Categories,
    ICategoryRepository,
    ICreateCategoryDTO,
} from '../ICategoriesRepository';

export class CategoryRepositoryInMemory implements ICategoryRepository {
    categories: Categories[] = [];

    async findByName(name: string): Promise<Categories> {
        return this.categories.find(el => el.name === name);
    }

    async list(): Promise<Categories[]> {
        return this.categories;
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Categories();

        Object.assign(category, {
            id: uuid(),
            name,
            description,
        });

        this.categories.push(category);
    }
}
