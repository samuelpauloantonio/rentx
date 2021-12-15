import { ICreateCategoryDTO } from '@modules/cars/infra/typeorm/repositories/CategoriesRespository';
import { Categories } from '@modules/cars/infra/typeorm/entities/categories';

interface ICategoryRepository {
    findByName(name: string): Promise<Categories>;
    list(): Promise<Categories[]>;
    create({ name, description }: ICreateCategoryDTO): Promise<Categories>;
    findOne(id: string): Promise<Categories>;
}
export { Categories, ICategoryRepository, ICreateCategoryDTO };
