import Categories from '../../models/categories';
import { ICategoryRepository } from '../ICategoriesRepository';

interface ICreateCategoryDTO {
    name: string;
    description: string;
}
class CategoriesRespository implements ICategoryRepository {
    private categories: Categories[];

    private static INSTANCE: CategoriesRespository;

    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoriesRespository {
        if (!CategoriesRespository.INSTANCE) {
            CategoriesRespository.INSTANCE = new CategoriesRespository();
        }

        return CategoriesRespository.INSTANCE;
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Categories();

        const Onecategory = Object.assign(category, {
            name: name.trim(),
            description,
        });

        this.categories.push(Onecategory);
    }

    list(): Categories[] {
        return this.categories;
    }

    findByName(name: string): Categories {
        return this.categories.find(category => category.name === name.trim());
    }

    findOne(id: string): Categories {
        const category = this.categories.find(
            Onecategory => Onecategory.id === id.trim(),
        );

        return category;
    }
}
export { ICreateCategoryDTO, CategoriesRespository };
