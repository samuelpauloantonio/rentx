import Categories from '../entities/categories';
import { ICreateCategoryDTO } from './implementations/CategoriesRespository';

interface ICategoryRepository {
    findByName(name: string): Promise<Categories>;
    list(): Promise<Categories[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    findOne?(id: string): Promise<Categories>;
}
export { Categories, ICategoryRepository, ICreateCategoryDTO };
