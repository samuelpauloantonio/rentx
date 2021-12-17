import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/erros/AppError';
import {
    ISpecificationsRepository,
    SpecificationsDTO,
} from '../../repositories/ISpecificationsRepository';

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specification: ISpecificationsRepository,
    ) {}

    async execute({ name, description }: SpecificationsDTO): Promise<void> {
        const findOne = await this.specification.findByName(name);
        if (findOne) throw new AppError('category already exists!');
        await this.specification.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
