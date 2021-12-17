import { getRepository, Repository } from 'typeorm';
import {
    ISpecificationsRepository,
    SpecificationsDTO,
} from '@modules/cars/repositories/ISpecificationsRepository';

import Specifications from '@modules/cars/infra/typeorm/entities/specification';

class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specifications>;

    constructor() {
        this.repository = getRepository(Specifications);
    }

    async findByIds(ids: string[]): Promise<Specifications[]> {
        const listWithSpecifications = await this.repository.findByIds(ids);
        return listWithSpecifications;
    }

    async create({
        name,
        description,
    }: SpecificationsDTO): Promise<Specifications> {
        const oneSpecification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(oneSpecification);

        return oneSpecification;
    }

    async findByName(name: string): Promise<Specifications> {
        const specification = this.repository.findOne({ name });

        return specification;
    }
}
export default SpecificationRepository;
