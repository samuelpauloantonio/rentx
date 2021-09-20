import fs from 'fs';
import csvParse from 'csv-parser';
import { inject, injectable } from 'tsyringe';
import { ICategoryRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategories {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject('CategoryRepository')
        private categoryRepository: ICategoryRepository,
    ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const parseFile = csvParse();
            const CategoriesList: IImportCategories[] = [];
            stream.pipe(parseFile);

            parseFile
                .on('data', async (line: IImportCategories) => {
                    const { name, description } = line;
                    CategoriesList.push({
                        name,
                        description,
                    });
                })
                .on('end', () => {
                    fs.promises.unlink(file.path); // deletar o arquivo
                    resolve(CategoriesList);
                })
                .on('error', err => {
                    reject(err);
                });
        });
    }

    public async excute(file: Express.Multer.File): Promise<void> {
        const newCategories = await this.loadCategories(file);
        newCategories.map(async category => {
            const { name, description } = category;
            const ifExistCategory = await this.categoryRepository.findByName(
                name,
            );

            if (!ifExistCategory) {
                await this.categoryRepository.create({ name, description });
            }
        });
    }
}

export { ImportCategoryUseCase };
