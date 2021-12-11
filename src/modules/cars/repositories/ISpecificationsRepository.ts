import Specification from '@modules/cars/infran/typeorm/entities/specification';

interface SpecificationsDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ name, description }: SpecificationsDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, SpecificationsDTO };
