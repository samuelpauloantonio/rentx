import { AppError } from '../CreateCategory/createCategoriesUseCase';
import {
    ISpecificationsRepository,
    SpecificationsDTO,
} from '../../repositories/ISpecificationsRepository';

class CreateSpecificationUseCase {
    constructor(private specification: ISpecificationsRepository) {}

    execute({ name, description }: SpecificationsDTO): void {
        const findOne = this.specification.findByName(name);
        if (findOne) throw new AppError('category already exists!');
        this.specification.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
