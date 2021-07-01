import Categories from '../models/categories';
import { ICreateCategoryDTO } from './implementations/CategoriesRespository';

interface ICategoryRepository {
    findByName(name: string): Categories;
    list(): Categories[];
    create({ name, description }: ICreateCategoryDTO): void;
    findOne?(id: string): Categories;
}
export { Categories, ICategoryRepository, ICreateCategoryDTO };
