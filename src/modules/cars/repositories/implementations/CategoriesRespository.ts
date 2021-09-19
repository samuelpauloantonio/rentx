import { EntityRepository, getRepository, Repository } from 'typeorm';
import Categories from '../../entities/categories';
import { ICategoryRepository } from '../ICategoriesRepository';

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

@EntityRepository(Categories)
class CategoriesRespository implements ICategoryRepository {
    private repository: Repository<Categories>;

    constructor() {
        this.repository = getRepository(Categories);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = await this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    async list(): Promise<Categories[]> {
        const category = await this.repository.find();
        return category;
    }

    async findByName(name: string): Promise<Categories> {
        const category = await this.repository.findOne({ name });
        return category;
    }

    async findOne(id: string): Promise<Categories> {
        const category = await this.repository.findOne({ id });
        return category;
    }
}
export { ICreateCategoryDTO, CategoriesRespository };
