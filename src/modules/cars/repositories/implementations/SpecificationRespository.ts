import {
    ISpecificationsRepository,
    SpecificationsDTO,
} from '../ISpecificationsRepository';

import Specifications from '../../models/specification';

class SpecificationRepository implements ISpecificationsRepository {
    private specifications: Specifications[];

    constructor() {
        this.specifications = [];
    }

    create({ name, description }: SpecificationsDTO): void {
        const specification = new Specifications();

        const oneSpecification = Object.assign(specification, {
            name,
            description,
        });

        this.specifications.push(oneSpecification);
    }

    findByName(name: string): Specifications {
        const specification = this.specifications.find(
            Onespecification => Onespecification.name === name.trim(),
        );

        return specification;
    }
}
export default SpecificationRepository;
