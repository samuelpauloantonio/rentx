import Specification from '../models/specification';

interface SpecificationsDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: SpecificationsDTO): void;
    findByName(name: string): Specification;
}

export { ISpecificationsRepository, SpecificationsDTO };
