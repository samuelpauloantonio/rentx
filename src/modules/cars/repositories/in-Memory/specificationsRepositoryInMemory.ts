import Specification from '@modules/cars/infra/typeorm/entities/specification';
import {
    ISpecificationsRepository,
    SpecificationsDTO,
} from '../ISpecificationsRepository';

export class SpecificationsRepositoryInMemory
    implements ISpecificationsRepository
{
    specifications: Specification[] = [];

    async create({
        name,
        description,
    }: SpecificationsDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
        });

        this.specifications.push(specification);

        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(el => el.name === name);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter(el => ids.includes(el.id));
    }
}
