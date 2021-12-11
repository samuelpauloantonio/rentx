import { ICreateCategoryDTO } from '@modules/cars/infran/typeorm/repositories/CategoriesRespository';
import Categories from '@modules/cars/infran/typeorm/entities/categories';

interface ICategoryRepository {
    findByName(name: string): Promise<Categories>;
    list(): Promise<Categories[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    findOne?(id: string): Promise<Categories>;
}
export { Categories, ICategoryRepository, ICreateCategoryDTO };
