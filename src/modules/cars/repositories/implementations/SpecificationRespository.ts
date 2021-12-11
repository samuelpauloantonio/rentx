import { getRepository, Repository } from 'typeorm';
import {
    ISpecificationsRepository,
    SpecificationsDTO,
} from '@modules/cars/repositories/ISpecificationsRepository';

import Specifications from '../../entities/specification';

class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specifications>;

    constructor() {
        this.repository = getRepository(Specifications);
    }

    async create({ name, description }: SpecificationsDTO): Promise<void> {
        const oneSpecification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(oneSpecification);
    }

    async findByName(name: string): Promise<Specifications> {
        const specification = this.repository.findOne({ name });

        return specification;
    }
}
export default SpecificationRepository;
